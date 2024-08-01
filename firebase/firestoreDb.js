//firebase/firebaseDb.js
import admin from 'firebase-admin';
import credentials from '../key.json' with { type: "json" };

admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const firestoreDb = admin.firestore();

const testConn = async (req, res) => {
    try {
        const snapshot = await firestoreDb.collection('users').limit(1).get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            res.status(200).send('Connected to Firestore, but no documents found.');
        } else {
            console.log('Connected to Firestore.');
            res.status(200).send('Successfully connected to Firestore.');
        }
    } catch (error) {
        console.error('Error connecting to Firestore:', error);
        res.status(500).send('Error connecting to Firestore.');
    }
};

export { firestoreDb, testConn };
