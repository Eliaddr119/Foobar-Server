import express from 'express';
import generateToken from '../controllers/token.js';
const router = express.Router();

router.use('/token', generateToken())

export default router;
