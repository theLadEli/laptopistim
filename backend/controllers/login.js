import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/database.js';

dotenv.config({ path: './config/.env' });
const JWT_SECRET = process.env.JWT_SECRET;

export default async function login (req,res) {
    const { email, password } = req.body;

    try {
        // Get user from DB
        const user = await db('users').select('*').where('email', email).first();
        if (!user) {
            return res.status(400).json({ error: "User email not found" });
        }

        // Compare password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: "Invalid password" });
        }

        // Generate token
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

        res.json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};