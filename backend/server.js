import express from 'express';
import dotenv from 'dotenv';
import spotRoutes from './routes/spotRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
import cors from 'cors';

// Load environment variables
dotenv.config({ path: './config/.env' });

const app = express();
const PORT = process.env.PORT || 5200;

// Allow requests from your frontend
app.use(cors());

// Middleware
app.use(express.json());

// Route: spots
app.use('/spots', spotRoutes);

// Route: cities
app.use('/cities', cityRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});