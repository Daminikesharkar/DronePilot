import express from 'express';

import { createMission, getMissionById, updateMission, deleteMission, startMissionSimulation } from '../controllers/mission';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();

router.post('/createMission',authenticate,createMission);
router.get('/getMissionById/:id',authenticate,getMissionById);
router.put('/updateMission/:id',authenticate,updateMission);
router.delete('/deleteMission/:id',authenticate,deleteMission);

router.post('/startMissionSimulation',authenticate,startMissionSimulation);

export default router;