import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js";

const taskSchema = new Schema({
    text : {
        type : String,
        required : true
    },
    completed : {
        type : Boolean,
        default : false
    },
    owner : {
        type : Schema.Types.ObjectId,
        required :true,
        ref: User
    }
},
    { timestamps: true });

export const Task = mongoose.model("Task", taskSchema);
