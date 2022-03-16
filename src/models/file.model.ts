import mongoose from "mongoose";
import { IUser } from "./user.model";

export interface IFile extends mongoose.Document{
    name: string,
    size: number,
    ext: string,
    type: string,
    description: string,
    father: string,
    route: string,
    carpet: boolean,
    date: Date,
    user: IUser,
};

const FileSchema = new mongoose.Schema({
    name: {type:String, required: true},
    size: {type:Number, required: true},
    ext: {type:String, required: true},
    type: {type:String, required: true},
    description: {type:String, required: true},
    father: {type:String, required: true},
    route: {type:String, required: true},
    carpet: {type:Boolean, default: false},
    date: {type:Date, default: new Date()},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
});

export const 
File = mongoose.model<IFile>("File", FileSchema);