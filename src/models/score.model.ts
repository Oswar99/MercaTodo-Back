import mongoose from "mongoose";
import { IUser } from "./user.model";

export interface IScore extends mongoose.Document{
    user: IUser,
    scoreBy: IUser,
    score: number,
    date: Date,
};

const ScoreSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    scoreBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    score: {type:Number, required:true},
    date: {type: Date, default: new Date()},
});

export const Score = mongoose.model<IScore>("Score", ScoreSchema);