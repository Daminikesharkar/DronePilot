import express, {Application , Request, Response} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import userRoutes from './routes/user';
import droneRoutes from './routes/drone';
import missionRoutes from './routes/mission';
import flightLogRoutes from './routes/flightLog';

dotenv.config();
const app: Application = express();

app.use(express.json());

app.use(userRoutes);
app.use(droneRoutes);
app.use(missionRoutes);
app.use(flightLogRoutes);

app.get('/',(req:Request,res:Response)=>{
    res.send("Welcome to DronePilot");
})

const mongoUri = (process.env.NODE_ENV === 'production' 
                   ? 'mongodb://mongo:27017/dronepilot'  
                   : 'mongodb://localhost:27017/dronepilot'); 

// mongodb+srv://kesharkardamini1234:<db_password>@cluster0.0epflzs.mongodb.net/dronepilot?retryWrites=true&w=majority
mongoose.connect(mongoUri)
.then(()=>{
    app.listen(process.env.port || 3000,()=>{
        console.log("Server is live on port 3000");
    })
})
.catch((error)=>{
    console.log('Failed to connect to the server',error);
})
