import db from '../config/database.js';

export default async function getSpotDetails(spotId) {
    try {
        // const spotDetails = await db('spots').where('id', spotId).first();
        const spotDetails = await db('spots')
            .select(
                'spots.id',
                'spots.name',
                'spots.address',
                'spots.recommended',
                'spots.approved',
                'spots.city',
                'spots.created_by',
                'spots.created_at',
                'spots.image',
                db.raw('AVG(CASE WHEN feedback_type.label = ? THEN feedback.value END) as avg_wifi_rating', ['WiFi']),
                db.raw('AVG(CASE WHEN feedback_type.label = ? THEN feedback.value END) as avg_power_sockets_rating', ['Power sockets']),
                db.raw('AVG(CASE WHEN feedback_type.label = ? THEN feedback.value END) as avg_crowdedness_rating', ['Crowdedness']),
                db.raw('AVG(CASE WHEN feedback_type.label = ? THEN feedback.value END) as avg_open_late_rating', ['Open late'])
            )
            .leftJoin('feedback', 'spots.id', 'feedback.spot')  // Join with feedback table
            .leftJoin('feedback_type', 'feedback.type', 'feedback_type.id')  // Join with feedback_type table
            .where('spots.id', spotId)  // Filter by spot ID
            .groupBy('spots.id')  // Group by the spot
            .first();  // Get a single object instead of an array
    
        return spotDetails;
    } catch (error) {
        console.error("Error fetching spot details:", error);
        throw new Error('Error fetching spot details');
    }
}