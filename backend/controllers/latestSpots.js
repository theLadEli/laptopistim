import db from '../config/database.js';

export default async function getLatestSpots() {
    return await db('spots').select('*').orderBy('created_at', 'desc').limit(10);
}