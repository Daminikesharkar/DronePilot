import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Drone = new Schema({
    created_at:{
        type:Date,
        default: Date.now
    },
    deleted_by:{
        type:mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        default: null
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    deleted_on:{
        type:Date,
        default: null
    },
    drone_type:{
        type:String,
        required: true
    },
    make_name:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    updated_at:{
        type:Date,
        required: Date.now
    }
})

export default mongoose.model('Drone',Drone);