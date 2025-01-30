import express from 'express';
import cors from 'cors';
import db from './database.js';

const PORT = 4769;
const app = express();
app.use(cors());
app.use(express.json());

app.get('/spots/latest', async (req, res) => {
    try {
        const spots = await db('spots')
            .select('id', 'name', 'address', 'recommended', 'image')
            .where('approved', true)
            .orderBy('created_at', 'desc')
            .limit(10);

        // Get feedback for each spot, grouped by type
        const spotsWithFeedback = await Promise.all(
            spots.map(async (spot) => {
                // Fetch feedback for this spot
                const feedback = await db('feedback')
                    .where('spot', spot.id);

                // Group feedback by type and calculate average for each type
                const feedbackByType = feedback.reduce((acc, {
                    type,
                    value
                }) => {
                    if (!acc[type]) {
                        acc[type] = {
                            total: 0,
                            count: 0
                        };
                    }
                    acc[type].total += parseInt(value);
                    acc[type].count += 1;
                    return acc;
                }, {});

                // Calculate the average rating for each feedback type
                const avgRatings = {};
                for (const [type, data] of Object.entries(feedbackByType)) {
                    avgRatings[type] = data.total / data.count;
                }

                // Add feedback averages to the spot object
                return {
                    ...spot,
                    avgRatings,
                    feedback
                };
            })
        );

        res.json(spotsWithFeedback);
    } catch (error) {
        res.status(500).json({
            error: 'Database error'
        });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));