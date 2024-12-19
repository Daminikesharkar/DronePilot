import mongoose from "mongoose";

const Schema = mongoose.Schema;

const waypointSchema = new Schema({
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

const Mission = new Schema({
    name: {
        type: String,
        required: true,
      },
      alt: {
        type: Number,
        required: true,
      },
      speed: {
        type: Number,
        required: true,
      },
      waypoints: [waypointSchema],
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
);

export default mongoose.model('Mission',Mission);