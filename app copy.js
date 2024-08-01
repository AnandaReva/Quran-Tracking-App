import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' with { type: "json" };
import admin from 'firebase-admin';
import credentials from './key.json' with { type: "json" };; 
import userRoutes from './routes/userRoutes.js';


admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const firestoreDb = admin.firestore();


export { firestoreDb }; // Ekspor firestoreDb

const app = express();

app.use(express.json());

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Swagger UI endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Test Firestore connection route
app.get('/', async (req, res) => {
  try {
    const snapshot = await firestoreDb.collection('your-collection-name').limit(1).get();
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
});

// User routes
app.use('/', userRoutes);

app.listen(8000, () => {
  console.log(`Server running at http://localhost:8000/`);
});
