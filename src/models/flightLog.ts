import mongoose from "mongoose";

const Schema = mongoose.Schema;

const waypointSchema = new Schema({
    time: {
        type: Number, 
        required: true,
    },
    lat: {
        type: Number, 
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    },
    alt: {
        type: Number,
        required: true,
    },
  });

const FlightLog = new Schema({
    drone_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Drone", 
        required: true,
    },
    mission_name: {
        type: String, 
        required: true,
    },
    waypoints: [waypointSchema], 
    speed: {
        type: Number, 
        required: true,
    },
    distance: {
        type: Number, 
        required: true,
    },
    execution_start: {
        type: Date, 
        required: true,
    },
    execution_end: {
        type: Date, 
    },
    created_at: {
        type: Date,
        default: Date.now, 
    },
    updated_at: {
        type: Date,
        default: Date.now, 
    },
},
{ timestamps: true }
)

export default mongoose.model('FlightLog',FlightLog);
