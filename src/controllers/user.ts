import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';

export const signUp = async (req:Request, res:Response) : Promise<void> => {
    const {username,email,password} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password,10);

        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(400).json({
                message: 'User already exists with this email address'
            });
        }

        const createdUser = await User.create({
            username:username,
            email:email,
            password:hashedPassword
        })

        if(createdUser){
            res.status(201).json({
                message:"User added successfully",
                user:createdUser
            })
        }        
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}