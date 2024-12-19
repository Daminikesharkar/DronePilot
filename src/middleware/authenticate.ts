import { Request, Response, NextFunction } from 'express';
import jwt , {JwtPayload} from 'jsonwebtoken';
import User from '../models/user';

declare global {
    namespace Express {
      interface Request {
        user?: any; 
      }
    }
}

export const authenticate = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const token = req.header('Autherization');
        if(token){
            const user = jwt.verify(token,process.env.SECRETKEY as string) as JwtPayload;
            const foundUser = await User.findById(user.userId);

            if(user){
                req.user = foundUser;
                next();
            } else {
                res.status(401).json({
                    message: 'Unauthorized'
                });
            }          
        } else {
            res.status(400).json({
                message: 'No token provided'
            });          
        }      
        
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}