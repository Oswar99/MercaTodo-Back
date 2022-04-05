import { Score } from "../models/score.model";
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

    public getUserScore(user: any):Promise<any>{
        return new Promise<any>(async (resolve) => {
            const c1 = await Score.countDocuments({user: user, score: 1});
            const c2 = await Score.countDocuments({user: user, score: 2});
            const c3 = await Score.countDocuments({user: user, score: 3});
            const c4 = await Score.countDocuments({user: user, score: 4});
            const c5 = await Score.countDocuments({user: user, score: 5}) + 1;
            const result = ((c5 * 5) + (c4 * 4) + (c3 * 3) + (c2 * 2) + (c1 * 1)) / (c5 + c4 + c3 + c2 + c1);
            resolve(result);
        });
    };

};

export default UserHelper;