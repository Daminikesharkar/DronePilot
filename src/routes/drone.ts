import express from 'express';
import { createDrone,getDronesByUser} from '../controllers/drone';

const router = express.Router();

router.post('/createDrone',createDrone);
router.get('/getDronesByUser',getDronesByUser);
router.put('/updateDrone');
router.delete('/deleteDrone');

export default router;