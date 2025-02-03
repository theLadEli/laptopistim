import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/database.js';

dotenv.config({ path: '../config/.env' });

export default async function login(req, res) {
    const { email, password } = req.body;
    console.log('Login attempt:', email)

    try {
        // Find user by email
        const user = await db('users').where('email', email).first();

        if (!user) {
            console.log('User not found:', email);
            return res.status(401).json({ error: 'User not found.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            console.log('Incorrect password for:', email);
            return res.status(401).json({ error: 'Incorrect password.' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        console.log('User authenticated:', email);

        res.json(token);
    } catch(error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Server error' });
    }

}