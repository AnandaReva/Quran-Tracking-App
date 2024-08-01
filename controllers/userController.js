// UserController.js
import { firestoreDb } from '../firebase/firestoreDb.js';
import { requireApiKey } from '../middlewares/apiKeyMiddleware.js';


// Mendapatkan semua pengguna
export const getAllUsers = async (req, res) => {
    try {
        const usersSnapshot = await firestoreDb.collection('users').get();
        const contentsSnapshot = await firestoreDb.collection('contents').get();
        const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const contents = contentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json({ users: users, contents });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mendapatkan satu pengguna berdasarkan field 'id'
export const getUser = async (req, res) => {
    const { id } = req.body; // Ambil id dari query parameter

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }
    try {
        const userSnapshot = await firestoreDb.collection('users')
            .where('id', '==', id)
            .limit(1)
            .get();
        if (userSnapshot.empty) {
            return res.status(404).json({ message: 'User not found' });
        }
        const contentSnapshot = await firestoreDb.collection('contents')
            .where('user_id', '==', id)
            .limit(1)
            .get();
        const userDoc = userSnapshot.docs[0];
        const contentDoc = contentSnapshot.docs[0];
        const userData = { id: userDoc.id, ...userDoc.data() };
        const contentData = { id: contentDoc.id, ...contentDoc.data() };
        res.json([{ user: userData }, { contentData }]);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Mencari pengguna berdasarkan email dan password
export const find = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    try {
        const usersSnapshot = await firestoreDb.collection('users')
            .where('email', '==', email)
            .get();

        if (!usersSnapshot.empty) {
            const user = usersSnapshot.docs[0].data();
            res.status(201).json({ message: 'User data found!', user });
        } else {
            res.status(401).json({ message: 'User not found or incorrect email and password' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Membuat pengguna baru
export const createUser = async (req, res) => {
    const { id, username, email, checkpoints = [1, 1, 1] } = req.body;

    if (!id || !username || !email) {
        return res.status(400).json({ message: 'Id, username, and email are required' });
    }
    try {
        const userRef = firestoreDb.collection('users').where('id', '==', id).limit(1);
        const userSnapshot = await userRef.get();

        if (!userSnapshot.empty) {
            return res.status(400).json({ message: 'User with this ID already exists' });
        }

        const batch = firestoreDb.batch();
        const newUserRef = firestoreDb.collection('users').doc();
        batch.set(newUserRef, {
            id,
            username,
            email,
            created_at: new Date(),
            updated_at: new Date()
        });

        const newContentRef = firestoreDb.collection('contents').doc();
        batch.set(newContentRef, {
            user_id: id,
            checkpoints,
            created_at: new Date(),
            updated_at: new Date()
        });
        await batch.commit();
        const newUser = await newUserRef.get();
        const newContent = await newContentRef.get();

        res.status(201).json({
            message: 'New User successfully added!',
            user: { id: newUser.id, ...newUser.data() },
            content: { id: newContent.id, ...newContent.data() }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// export const createUser = async (req, res) => {
//     const { id, username, email, checkpoints = [1, 1, 1] } = req.body;

//     if (!id || !username || !email) {
//         return res.status(400).json({ message: 'Id, username, and email are required' });
//     }
//     try {
//         const userRef = firestoreDb.collection('users').where('id', '==', id).limit(1);
//         const userSnapshot = await userRef.get();

//         if (!userSnapshot.empty) {
//             return res.status(400).json({ message: 'User with this ID already exists' });
//         }

//         const batch = firestoreDb.batch();
//         const newUserRef = firestoreDb.collection('users').doc();
//         batch.set(newUserRef, {
//             id,
//             username,
//             email,
//             created_at: new Date(),
//             updated_at: new Date()
//         });

//         const newContentRef = firestoreDb.collection('contents').doc();
//         batch.set(newContentRef, {
//             user_id: id,
//             checkpoints,
//             created_at: new Date(),
//             updated_at: new Date()
//         });
//         await batch.commit();
//         const newUser = await newUserRef.get();
//         const newContent = await newContentRef.get();

//         res.status(201).json({
//             message: 'New User successfully added!',
//             user: { id: newUser.id, ...newUser.data() },
//             content: { id: newContent.id, ...newContent.data() }
//         });

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// Memperbarui pengguna
export const updateUser = async (req, res) => {
    const { id, username, email } = req.body;
    if (!id || !username || !email) {
        return res.status(400).json({ message: 'Id, username, and email are required' });
    }
    try {
        const userRef = firestoreDb.collection('users').doc(id);

        await firestoreDb.runTransaction(async (transaction) => {
            const doc = await transaction.get(userRef);
            if (!doc.exists) {
                throw new Error('User does not exist');
            }

            transaction.update(userRef, {
                username,
                email,
                updated_at: new Date()
            });
        });

        const updatedUserDoc = await userRef.get();
        res.json({ message: 'User updated successfully', user: { id: updatedUserDoc.id, ...updatedUserDoc.data() } });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Menghapus pengguna
export const deleteUser = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    try {
        const userRef = firestoreDb.collection('users').doc(id);
        const contentsRef = firestoreDb.collection('contents').where('user_id', '==', id);

        await firestoreDb.runTransaction(async (transaction) => {
            // Memeriksa apakah pengguna ada
            const userDoc = await transaction.get(userRef);
            if (!userDoc.exists) {
                throw new Error('User does not exist');
            }

            // Menghapus dokumen pengguna
            transaction.delete(userRef);

            // Menghapus semua konten terkait dengan user_id yang sama
            const contentsSnapshot = await transaction.get(contentsRef);
            contentsSnapshot.forEach((contentDoc) => {
                transaction.delete(contentDoc.ref);
            });
        });

        res.json({ message: 'User and content deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Terapkan middleware requireApiKey pada semua rute UserController yang membutuhkan akses yang terotentikasi
export const userRoutes = {
    getAllUsers: [requireApiKey, getAllUsers],
    getUser: [requireApiKey, getUser],
    find: [requireApiKey, find],
    createUser: [requireApiKey, createUser],
    updateUser: [requireApiKey, updateUser],
    deleteUser: [requireApiKey, deleteUser]
};
