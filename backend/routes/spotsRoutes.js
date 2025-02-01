import express from 'express';
import getSpots from '../controllers/spotsController.js'

const router = express.Router();

router.get('/', getSpots);

export default router;