import db from '../config/database.js';

async function getSpots(req, res) {
    console.log('inside getSpots function')
    try {
        console.log('Trying to get spots')
        const spots = await db('spots').select('*');
        await console.log(spots)
        res.json(spots);
    } catch (err) {
        res.status(500).json({
            error: 'Error fetching spots'
        });
    }
};

export default getSpots;