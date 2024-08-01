// resourcetController.js
import axios from 'axios';
import { requireApiKey } from '../middlewares/apiKeyMiddleware.js';

// import quranData from '../quran.json' with { type: "json" };
// import { firestore } from 'firebase-admin';
import { firestoreDb } from '../firebase/firestoreDb.js';

//source https://alquran.cloud/api

/// esxp 
/* [
  {
    number: 1,
    name: "سُورَةُ ٱلْفَاتِحَةِ",
    englishName: "Al-Faatiha",
    englishNameTranslation: "The Opening",
    revelationType: "Meccan",
    ayahs: [
      {
        number: 1,
        text: "﻿بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
        numberInSurah: 1,
        juz: 1,
        manzil: 1,
        page: 1,
        ruku: 1,
        hizbQuarter: 1,
        sajda: false,
      },
      {
        number: 2,
        text: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
        numberInSurah: 2,
        juz: 1,
        manzil: 1,
        page: 1,
        ruku: 1,
        hizbQuarter: 1,
        sajda: false,
      },
      // Tambahkan ayat lainnya di sini
    ],
  },
  {
    number: 2,
    name: "سُورَةُ البَقَرَةِ",
    englishName: "Al-Baqara",
    englishNameTranslation: "The Cow",
    revelationType: "Medinan",
    ayahs: [
      {
        number: 8,
        text: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ الٓمٓ",
        numberInSurah: 1,
        juz: 1,
        manzil: 1,
        page: 2,
        ruku: 2,
        hizbQuarter: 1,
        sajda: false,
      },
      // Tambahkan ayat lainnya di sini
    ],
  },
  // Tambahkan surah lainnya di sini
];
 */



// // Fungsi untuk mengunggah data Quran ke Firestore
// export const uploadQuranDataToFirestore = async (req, res) => {
//     try {
//         // Mulai batch
//         const batch = firestoreDb.batch();

//         // Loop melalui setiap surah dalam data Quran
//         quranData.forEach((surah) => {
//             const surahRef = firestoreDb.collection('surahs').doc(String(surah.number));

//             batch.set(surahRef, {
//                 number: surah.number,
//                 name: surah.name,
//                 englishName: surah.englishName,
//                 englishNameTranslation: surah.englishNameTranslation,
//                 revelationType: surah.revelationType,
//                 ayahs: surah.ayahs
//             });
//         });

//         // Commit batch
//         await batch.commit();

//         // Mengirim respon sukses
//         res.status(201).json({ message: 'Quran data successfully uploaded to Firestore!' });
//     } catch (error) {
//         console.error('Error uploading Quran data:', error);
//         res.status(500).json({ message: 'Failed to upload Quran data', error: error.message });
//     }
// };






//exp: https://api.alquran.cloud/v1/surah
export const getAllSurahList = async (req, res) => {
  try {
    const surahsSnapshot = await firestoreDb
      .collection('surahs')
      .orderBy('number') // Mengurutkan berdasarkan 'number'
      .get();

    const surahList = surahsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        number: data.number,
        name: data.name,
        englishName: data.englishName,
      };
    });

    res.status(200).json(surahList);
  } catch (error) {
    console.error('Error getting surah list:', error);
    res.status(500).json({ error: 'Failed to fetch surah list' });
  }
};

// exp https://api-alquran-cloud.translate.goog/v1/surah/2
// pagination , exp: get ayah 1- 10 from surah with surahId = 1

/* {
    "ayahs": [
        {
            "number": 1,
            "text": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ الٓمٓ"
        },
        {
            "number": 2,
            "text": "ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًۭى لِّلْمُتَّقِينَ"
        },
        {
            "number": 3,
            "text": "ٱلَّذِينَ يُؤْمِنُونَ بِٱلْغَيْبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقْنَٰهُمْ يُنفِقُونَ"
        },
        {
            "number": 4,
            "text": "وَٱلَّذِينَ يُؤْمِنُونَ بِمَآ أُنزِلَ إِلَيْكَ وَمَآ أُنزِلَ مِن قَبْلِكَ وَبِٱلْءَاخِرَةِ هُمْ يُوقِنُونَ"
        },
        {
            "number": 5,
            "text": "أُو۟لَٰٓئِكَ عَلَىٰ هُدًۭى مِّن رَّبِّهِمْ ۖ وَأُو۟لَٰٓئِكَ هُمُ ٱلْمُفْلِحُونَ"
        },
        {
            "number": 6,
            "text": "إِنَّ ٱلَّذِينَ كَفَرُوا۟ سَوَآءٌ عَلَيْهِمْ ءَأَنذَرْتَهُمْ أَمْ لَمْ تُنذِرْهُمْ لَا يُؤْمِنُونَ"
        },
        {
            "number": 7,
            "text": "خَتَمَ ٱللَّهُ عَلَىٰ قُلُوبِهِمْ وَعَلَىٰ سَمْعِهِمْ ۖ وَعَلَىٰٓ أَبْصَٰرِهِمْ غِشَٰوَةٌۭ ۖ وَلَهُمْ عَذَابٌ عَظِيمٌۭ"
        },
        {
            "number": 8,
            "text": "وَمِنَ ٱلنَّاسِ مَن يَقُولُ ءَامَنَّا بِٱللَّهِ وَبِٱلْيَوْمِ ٱلْءَاخِرِ وَمَا هُم بِمُؤْمِنِينَ"
        },
        {
            "number": 9,
            "text": "يُخَٰدِعُونَ ٱللَّهَ وَٱلَّذِينَ ءَامَنُوا۟ وَمَا يَخْدَعُونَ إِلَّآ أَنفُسَهُمْ وَمَا يَشْعُرُونَ"
        },
        {
            "number": 10,
            "text": "فِى قُلُوبِهِم مَّرَضٌۭ فَزَادَهُمُ ٱللَّهُ مَرَضًۭا ۖ وَلَهُمْ عَذَابٌ أَلِيمٌۢ بِمَا كَانُوا۟ يَكْذِبُونَ"
        }
    ]
} */

export const getSurahAyahPagination = async (req, res) => {
  const { surahId, ayahIdx, ayahLimit } = req.body;

  console.log(req.body);
  // Validasi input
  if (!surahId || ayahIdx === undefined || ayahLimit === undefined) {
    return res.status(400).json({ message: 'surahId, ayahIdx, and ayahLimit are required' });
  }

  try {
    // Dapatkan dokumen surah berdasarkan ID
    const surahRef = await firestoreDb.collection('surahs').doc(surahId).get();
    if (!surahRef.exists) {
      return res.status(404).json({ message: 'Surah not found' });
    }

    const surahData = surahRef.data();
    const ayahs = surahData.ayahs || [];

    // Ambil ayah dari indeks ayahIdx sampai ayahLimit
    const ayahData = ayahs.slice(parseInt(ayahIdx - 1), parseInt(ayahIdx - 1) + parseInt(ayahLimit)).map((ayah, index) => {
      return {
        number: ayah.numberInSurah || index + parseInt(ayahIdx),
        text: ayah.text || ayah.getText || '',
      };
    });

    res.status(200).json({
      // ayahIdx: ayahIdx,
      // ayahLimit: ayahLimit,
      ayahs: ayahData
    });
  } catch (error) {
    console.error("Error fetching surah details:", error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




// Terapkan middleware requireApiKey pada semua rute resourceController yang membutuhkan akses yang terotentikasi
export const resourceRoutes = {
  // uploadQuranDataToFirestore: [requireApiKey, uploadQuranDataToFirestore],
  getAllSurahList: [requireApiKey, getAllSurahList],
  getSurahAyahPagination: [requireApiKey, getSurahAyahPagination],
 
};
