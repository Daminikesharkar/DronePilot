import express from 'express';

import { signUp } from '../controllers/user';

const router = express.Router();

router.post('/signUp',signUp);
router.post('login');


export default router;