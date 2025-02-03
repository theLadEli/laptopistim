import db from '../config/database.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config({ path: '../config/.env' });

export default async function register(req, res) {
    const JWT_SECRET_KEY = process.env.JWT_SECRET;
    
    const { firstName, lastName, email, phone, city, password } = req.body;

    try {

        // check if the user exists
        const existingUser = await db('users').where({ email }).first();
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // register the user
        const [userId] = await db('users')
            .insert({
                first_name: firstName,
                last_name: lastName,
                email,
                phone,
                city,
                password: hashedPassword
            }).returning('id');
        
        // generate a token
        const token = jwt.sign({ userId }, JWT_SECRET_KEY, { expiresIn: '7d' });
        
        res.status(201).json({ token });
    } catch(error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}