import express from 'express';
import { getAllSpots } from '../controllers/allSpots.js';
import getLatestSpots from '../controllers/latestSpots.js';

const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const spots = await getAllSpots();
        res.json(spots);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching all spots' });
    }
});

router.get('/latest-spots', async (req, res) => {
    try {
        const spots = await getLatestSpots();
        res.json(spots);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching latest spots' });
    }
});

export default router;