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

            const flightLog = new FlightLog({
                drone_id: droneId,
                mission_name: mission.name,
                waypoints: [], 
                speed: mission.speed,
                distance: 0,
                execution_start: new Date(),
                execution_end: null,
            });

            await flightLog.save();

            //Simulation starts here
            let totalDistance = 0;
            let timeElapsed = 0;
            let lastWaypoint = mission.waypoints[0];

            for (let i = 1; i < mission.waypoints.length; i++) {

                const currentWaypoint = mission.waypoints[i];
                const distance = calculateDistance(lastWaypoint.lat, lastWaypoint.lng, currentWaypoint.lat, currentWaypoint.lng);
                totalDistance += distance;

                const timeToTravel = calculateTime(distance, mission.speed);

                flightLog.waypoints.push({
                  time: timeElapsed,
                  lat: currentWaypoint.lat,
                  lng: currentWaypoint.lng,
                  alt: currentWaypoint.alt,
                });
          
                timeElapsed += timeToTravel;
                lastWaypoint = currentWaypoint;                
            }

            flightLog.distance = totalDistance;
            flightLog.execution_end = new Date(); 
            await flightLog.save();
        }   

        res.status(200).json({
            message: "Mission started and simulation completed successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: `Internal Server Error ${error}`,
        });
    }
}

function calculateDistance(lat1:any, lon1:any, lat2:any, lon2:any) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; 
}

function calculateTime(distance: number, speed: number) {
    const speedInMetersPerSecond = speed * 1000 / 3600; 
    return distance / speedInMetersPerSecond; 
}