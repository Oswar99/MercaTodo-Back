import mongoose from "mongoose";

export interface IUser extends mongoose.Document{
    user_name: string,
    user_mail: string,
    user_phone: string,
    user_address: string,
    user_dep: string,
    user_nick: string,
    user_pass: string,
    user_type: string,
    enabled: boolean,
    verified: boolean,
    join_time: Date,
    last_session: Date,
};

const UserSchema = new mongoose.Schema({
    user_name: {type:String, required: true},
    user_mail: {type:String, required: true},
    user_phone: {type:String, required: true},
    user_address: {type:String, required: true},
    user_dep: {type:String, default: "FRANCISCO MORAZAN"},
    user_nick: {type:String, required: false},
    user_pass: {type:String, required: true},
    user_type: {type:String, required: true},
    enabled: {type: Boolean, default: true},
    verified: {type: Boolean, default: false},
    join_time: {type:Date, default: new Date()},
    last_session: {type:Date, default: new Date()},
});

export const User = mongoose.model<IUser>("User", UserSchema);