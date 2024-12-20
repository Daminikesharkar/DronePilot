import {Request,Response} from 'express';
import Mission from '../models/mission';
import Drone from '../models/drone';
import FlightLog from '../models/flightLog';

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
            error: `Internal Server Error ${error}`
        });
    }
};

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
            error: `Internal Server Error ${error}`,
        });
    }
};

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
    } catch (error) {
        res.status(500).json({
            error: `Internal Server Error ${error}`,
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
    } catch (error) {
        res.status(500).json({
            error: `Internal Server Error ${error}`,
        });
    }
};

export const startMissionSimulation = async (req:Request,res:Response):Promise<void> =>{

    try {
        const { missionId, droneId } = req.body;

        const mission = await Mission.findById(missionId)
        if (!mission) {
            res.status(404).json({ 
                message: "Mission not found" 
            });
        }

        const drone = await Drone.findById(droneId);
        if (!drone) {
            res.status(404).json({ 
                message: "Drone not found" 
            });
        }

        if(mission){
            mission.drone_id = droneId;
            await mission.save(); 
        }   

        res.status(200).json({
            message: "Mission started and simulation completed successfully",
            mission,
        });

    } catch (error) {
        res.status(500).json({
            error: `Internal Server Error ${error}`,
        });
    }
}