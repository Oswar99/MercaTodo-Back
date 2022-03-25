import mongoose from "mongoose";
import { IProduct } from "./product.model";
import { IUser } from "./user.model";

export interface IChat extends mongoose.Document{
    from: IUser,
    of: IUser,
    message: string,
    id: string,
    product: IProduct,
    date: Date,
};

const ChatSchema = new mongoose.Schema({
    from: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    of: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    message: {type:String, required:true},
    id: {type:String, required:true},
    product: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
    date: {type: Date, default: new Date()},
});

export const Chat = mongoose.model<IChat>("Chat", ChatSchema);