import db from '../config/database.js';

export default async function getSpotDetails(spotId) {
    try {
        const spotDetails = await db('spots').where('id', spotId).first();
        return spotDetails;
    } catch (error) {
        console.error("Error fetching spot details:", error);
        throw new Error('Error fetching spot details');
    }
}