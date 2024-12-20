import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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
            error: `Internal Server Error ${error}`,
        });
    }
}

export const login = async(req:Request,res:Response):Promise<void> =>{

    const { email,password } = req.body;

    try {
        const user = await User.findOne({email});

        if(user){
            const passwordMatch = await bcrypt.compare(password,user.password);

            if(passwordMatch){
                const secretKey = process.env.SECRETKEY as string;
                const token = jwt.sign({userId:user.id}, secretKey, {expiresIn: '1h'});
                
                res.status(200).json({
                    message: 'User logged in successfully',
                    token: token,
                    user: user
                });               

            }else {
                res.status(401).json({
                    message: "Password doesn't match, please try again"
                });
            }
        }else {
            res.status(400).json({
                message: "Email address is not registered please signUp first"
            });
        }    
    } catch (error) {
        res.status(500).json({
            error: `Internal Server Error ${error}`,
        });
    }

}