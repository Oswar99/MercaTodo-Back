import { IUser, User } from "../models/user.model";

class UserHelper {

    public getUsers(filter:any): Promise<IUser[]>{
        return new Promise<IUser[]>((resolve)=>{
            User.find(filter, (err:Error, users:IUser[])=>{
                if(err){
                    console.log("UserHelper: ha ocurrido un error en user.find de getUsers.");
                }else{
                    resolve(users);
                };
            });
        });
    };

    public updateUsers(filter:any, body:any): Promise<any>{
        return new Promise<any>((resolve)=>{
            User.updateMany(filter,body,null, (err:any, users:any)=>{
                if(err){
                    console.log("UserHelper: ha ocurrido un error en user.updatemany de updateUsers.");
                }else{
                    resolve(users);
                };
            });
        });
    };

};

export default UserHelper;