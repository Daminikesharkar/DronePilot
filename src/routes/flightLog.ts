import express from 'express';
import { getFlightLog,generateFlightLogPDF } from '../controllers/flightLog';

const router = express.Router();

router.get('/flightLog/:id',getFlightLog);
router.get("/flightLog/pdf/:id", generateFlightLogPDF);

export default router;