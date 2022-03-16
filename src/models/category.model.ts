import mongoose from "mongoose";
import { IUser } from "./user.model";

export interface ICategory extends mongoose.Document{
    user: IUser,
    name: string,
    father: string,
    date: Date,
};

const CategorySchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    name: {type:String, required:true},
    father: {type:String, default:"main"},
    date: {type: Date, default: new Date()},
});

export const Category = mongoose.model<ICategory>("Category", CategorySchema);