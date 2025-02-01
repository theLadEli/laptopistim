import express from 'express';
import dotenv from 'dotenv';
import knex from 'knex';

// Database connection
import db from './config/database.js';

// Load environment variables
dotenv.config({ path: './config/.env' });

const app = express();
const PORT = process.env.PORT || 5200;

// Middleware
app.use(express.json());

// Route: Get all spots
app.get('/spots', async (req, res) => {
    try {
        const spots = await db('spots').select('*');
        res.json(spots);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Error fetching spots' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});