import express, {Application , Request, Response} from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app: Application = express();

app.get('/',(req:Request,res:Response)=>{
    res.send("Welcome to DronePilot");
})

app.listen(process.env.port || 3000,()=>{
    console.log("Server is live on port 3000");
})
