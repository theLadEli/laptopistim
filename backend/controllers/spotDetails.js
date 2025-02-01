import db from '../config/database.js';

export default async function getSpotDetails(spotId) {
    try {
        return await db('spots').where('id', spotId);
    } catch (error) {
        console.error("Error fetching spot details:", error);
        throw new Error('Error fetching spot details');
    }
}