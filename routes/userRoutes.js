import express from 'express';
import * as userController from '../controllers/userController.js'; // Ubah path sesuai dengan struktur proyek Anda

const router = express.Router();

router.get('/users', userController.userRoutes.getAllUsers);
router.post('/user', userController.userRoutes.getUser);
router.post('/user/find', userController.userRoutes.find);
router.post('/user/add', userController.userRoutes.createUser);
router.put('/user/update/:id', userController.userRoutes.updateUser);
router.delete('/user/delete', userController.userRoutes.deleteUser);

export default router;
