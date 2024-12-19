import express from 'express';
import { createDrone,getDronesByUser,updateDrone,deleteDrone} from '../controllers/drone';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();

router.post('/createDrone',authenticate,createDrone);
router.get('/getDronesByUser',authenticate,getDronesByUser);
router.put('/updateDrone/:id',authenticate,updateDrone);
router.delete('/deleteDrone/:id',authenticate,deleteDrone);

export default router;