import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import spotsRoutes from './routes/spotsRoutes.js'; // Ensure the correct file extension

const app = express();
app.use(cors());
app.use(express.json());

app.use('/spots', spotsRoutes);

const PORT = process.env.PORT || 4769;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));