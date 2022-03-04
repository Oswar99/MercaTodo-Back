import mongoose from "mongoose";
import { IUser } from "./user.model";

export interface ISession extends mongoose.Document{
    user: IUser,
    join: Date,
    end: Date,
    last_act: Date,
};

const SessionSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    join: {type: Date, default: new Date()},
    end: {type: Date, required: false},
    last_act: {type: Date, default: new Date()},
});

export const Session = mongoose.model<ISession>("Session", SessionSchema);