import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import spotRoutes from './routes/spotRoutes.js';
import cityRoutes from './routes/cityRoutes.js';

// Load environment variables
dotenv.config({ path: './config/.env' });

const app = express();
const PORT = process.env.PORT || 5200;

const router = express.Router();
// Allow requests from your frontend
app.use(cors());

// Middleware
app.use(express.json());

// Route: login
app.post('/login', async (req, res) => {

    try {
        res.json({
            token: 'test123'
        });
    } catch(error) {
        res.status(500).json({ error: 'Error sending token' });
    }

});

export default router;

// Route: spots
app.use('/spots', spotRoutes);

// Route: cities
app.use('/cities', cityRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});