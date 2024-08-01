// routes/resourceRoutes.js
import express from 'express';
import * as resourceController from '../controllers/resourceController.js'; // Ubah path sesuai dengan struktur proyek Anda

const router = express.Router();


// router.get('/surahsUpload', resourceController.resourceRoutes.uploadQuranDataToFirestore );

router.get('/surahs', resourceController.resourceRoutes.getAllSurahList);
router.post('/surah', resourceController.resourceRoutes.getSurahAyahPagination);
 
export default router;