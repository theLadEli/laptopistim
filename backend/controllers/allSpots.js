import db from '../config/database.js';

export async function getAllSpots() {
    return await db('spots').select('*');
};