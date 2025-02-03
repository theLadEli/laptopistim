import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../config/database.js';

dotenv.config({ path: '../config/.env' });

export default async function account(req, res) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Get user details
    const user = await db('users').where('id', userId).first();

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error fetching account details' });
  }
};