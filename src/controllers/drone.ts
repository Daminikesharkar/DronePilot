import {Request,Response} from 'express';
import Drone from '../models/drone';

export const createDrone = async(req:Request, res:Response): Promise<void>=>{

    const { name, drone_type, make_name } = req.body;
    const created_by = req.user._id;

    try {
        const drone = await Drone.create({
            name,
            drone_type,
            make_name,
            created_by
        })

        res.status(200).json({
            message: 'Drone created successfully',
            drone: drone
        }); 
        
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

export const getDronesByUser = async(req:Request,res:Response):Promise<void> =>{

        try {
            const drones = await Drone.find({ created_by: req.user._id });

            res.status(200).json({
                message: 'Drones per user fetched successfully',
                drones: drones
            }); 

        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error'
            });
        }
}

export const updateDrone = async(req:Request,res:Response):Promise<void> =>{
    try {

        const updatedDrone = await Drone.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } 
        );

        if (!updatedDrone) {
            res.status(404).json({
                message: 'Drone not found'
            });
        }

        res.status(200).json({
            message: 'Drone updated successfully',
            drone: updatedDrone
        });
        
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

export const deleteDrone = async(req:Request,res:Response):Promise<void> =>{
    
    try {
        const drone = await Drone.findById(req.params.id);

        if (!drone) {
            res.status(404).json({
                message: 'Drone not found',
            });
        }

        await Drone.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: 'Drone deleted successfully',
        }); 
        
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        });        
    }
}