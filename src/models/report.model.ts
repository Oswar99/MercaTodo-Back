import mongoose from "mongoose";
import { IUser } from "./user.model";

export interface IReport extends mongoose.Document{
    reportedBy: IUser,
    userReported: IUser,
    title: string,
    description: string,
    active: boolean,
    date: Date,
};

const ReportSchema = new mongoose.Schema({
    reportedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    userReported: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    title: {type:String, required:true},
    description: {type:String, required:true},
    active: {type:Boolean, require: true, default: true},
    date: {type: Date, default: new Date()},
});

export const Report = mongoose.model<IReport>("Report", ReportSchema);