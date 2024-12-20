import {Request,Response} from 'express';
import FlightLog from '../models/flightLog';
import PDFDocument from "pdfkit";

export const getFlightLog = async(req:Request,res:Response):Promise<void>=>{
    const flightId  = req.params.id;

    try {
        const flightLog = await FlightLog.findById(flightId).populate('drone_id');

        res.status(200).json({
            message: "flightLog found successfully",
            flightLog,
        });

    } catch (error) {
        res.status(500).json({
            error: `Internal Server Error ${error}` 
        });
    }
}

export const generateFlightLogPDF = async(req:Request,res:Response):Promise<void>=>{
    const flightId  = req.params.id;

    try {
        const flightLog = await FlightLog.findById(flightId).populate("drone_id");
        const doc = new PDFDocument();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=flight_log_${flightId}.pdf`
        );

        doc.pipe(res);

        doc.fontSize(16).text("Flight Log Report", { align: "center" });
        doc.moveDown();

        if(flightLog){

            doc.fontSize(12).text(`Mission Name: ${flightLog.mission_name}`);
            doc.text(`Drone information: ${flightLog.drone_id}`);
            doc.text(`Speed: ${flightLog.speed} km/h`);
            doc.text(`Distance: ${flightLog.distance} meters`);
            doc.text(`Execution Start: ${flightLog.execution_start}`);
            doc.text(`Execution End: ${flightLog.execution_end || "Ongoing"}`);
            doc.moveDown();

            doc.text("Waypoints:", { underline: true });
            flightLog.waypoints.forEach((waypoint, index) => {
            doc.text(`Waypoint ${index + 1}:`);
            doc.text(`Time: ${waypoint.time} seconds`);
            doc.text(`Latitude: ${waypoint.lat}`);
            doc.text(`Longitude: ${waypoint.lng}`);
            doc.text(`Altitude: ${waypoint.alt} meters`);
            doc.moveDown();
            });
        }

        doc.end();
    } catch (error) {
        res.status(500).json({
            error: `Internal Server Error ${error}`
        });
    }
}

