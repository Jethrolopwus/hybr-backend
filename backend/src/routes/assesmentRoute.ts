import express from 'express';
import { submitAssessment, getAssessment } from '../controllers/assesmentController';

const router = express.Router();

// POST route to submit a new assessment
router.post('/assessments', submitAssessment);

// GET route to fetch an assessment by ID
router.get('/assessments/:id', getAssessment);

export default router;