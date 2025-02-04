import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import spotRoutes from './routes/spotRoutes.js';
import cityRoutes from './routes/cityRoutes.js';

import login from './controllers/login.js';
import register from './controllers/register.js';
import account from './controllers/account.js';

// Load environment variables
dotenv.config({ path: './config/.env' });

const app = express();
const PORT = process.env.PORT || 5200;

// Allow requests from your frontend
app.use(cors());

// Middleware
app.use(express.json());

// // Route: login
app.post('/login', login);

// // Route: register
app.post('/register', register);


// // Route: register
app.use('/account', account);

// Route: spots
app.use('/spots', spotRoutes);

// Route: cities
app.use('/cities', cityRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});