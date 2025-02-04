import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/database.js';

dotenv.config({ path: './config/.env' });
const JWT_SECRET = process.env.JWT_SECRET;

export default async function register (req, res) {
    const { firstName, lastName, email, phone, city, password } = req.body;

    try {
        // Check if user exists
        const existingUser = await db('users').select('*').where('email',email);
        
        if (existingUser.length > 0) {
            return res.status(400).json({ error: "Email already in use" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to database
        const newUser = await db('users').insert({
            first_name: firstName,
            last_name: lastName,
            email,
            phone,
            city,
            password: hashedPassword,
        },['id'])

        // Generate token
        const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '7d' });

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};