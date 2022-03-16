import { IFile, File } from "../models/file.model";

export class FileHelper{

    public getOne(filter:any): Promise<IFile>{
        return new Promise<IFile>((resolve)=>{
            File.findOne(filter, (err:Error, res:IFile)=>{
                if(err){
                    console.log(err.message);
                }else{
                    resolve(res);
                }
            })
        })
    };

};
