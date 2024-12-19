import {Request,Response} from 'express';
import Mission from '../models/mission';

export const createMission = async(req:Request,res:Response):Promise<void> =>{
    const { name, alt, speed, waypoints } = req.body;

    try {
        const newMission = await Mission.create({
            name,
            alt,
            speed,
            waypoints,
        })

        res.status(201).json({
            message: 'Mission created successfully',
            mission: newMission,
        });

    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

export const getMissionById = async(req:Request,res:Response):Promise<void> =>{
    try {
        const missionId = req.params.id;
        const mission = await Mission.findById(missionId);

        if (!mission) {
            res.status(404).json({
                message: 'Mission not found',
            });
        }

        res.status(201).json({
            message: 'Mission fetched successfully',
            mission: mission,
        });
        
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

export const updateMission = async (req: Request, res: Response):Promise<void> => {
    try {
        const missionId = req.params.id;
        const updatedMission = await Mission.findByIdAndUpdate(
            missionId,
            req.body,
            { new: true }
        );

        if (!updatedMission) {
            res.status(404).json({
                message: 'Mission not found',
            });
        }

        res.status(200).json({
            message: 'Mission updated successfully',
            mission: updatedMission,
        });
    } catch (err) {
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};
export const deleteMission = async (req: Request, res: Response):Promise<void> => {
    try {
        const missionId = req.params.id;
        const deletedMission = await Mission.findByIdAndDelete(missionId);

        if (!deletedMission) {
            res.status(404).json({
                message: 'Mission not found',
            });
        }

        res.status(200).json({
            message: 'Mission deleted successfully',
        });
    } catch (err) {
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};