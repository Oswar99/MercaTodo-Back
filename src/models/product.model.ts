import mongoose from "mongoose";
import { ICategory } from "./category.model";
import { IUser } from "./user.model";

export interface IProduct extends mongoose.Document{
    user: IUser,
    marca: string,
    modelo: string,
    name: string,
    description: string,
    tag: string,
    value: number,
    date: Date,
    count: number,
    enabled: boolean,
    departament: string,
    category: ICategory,
};

const ProductSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    marca: {type:String, required: true},
    modelo: {type:String, default: "N/A"},
    name: {type:String, required: true},
    description: {type:String, required: true},
    tag: {type:String, required: true},
    value: {type:Number, required: true},
    date:  {type:Date, default: new Date()},
    count: {type:Number, required: false},
    enabled: {type:Boolean, default: true},
    departament: {type:String, default:"FRANCISCO MORAZAN"},
    category: {type: mongoose.Schema.Types.ObjectId, ref: "Category"},
});

export const Product = mongoose.model<IProduct>("Product", ProductSchema);