import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' with { type: "json" };
import { firestoreDb, testConn } from './firebase/firestoreDb.js';
import userRoutes from './routes/userRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';

const app = express();
app.use(express.json());

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Swagger UI endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Test Firestore connection route
app.get('/', testConn);

// User routes
app.use('/', userRoutes);
app.use('/', resourceRoutes);

app.listen(8000, () => {
  console.log(`Server running at http://localhost:8000/`);
});
