import { Request, Response } from "express";
import { decodeModel, encodeModel } from "../helpers/jwt.helper";
import SessionHelper from "../helpers/Session.helper";
import fs from "fs";
import { UploadedFile } from "express-fileupload";
import { File, IFile } from "../models/file.model";

export class FileService extends SessionHelper {

    public async docSend(req: Request, res: Response) {
        const doc: any = await decodeModel(req.params.id);
        res.writeHead(200, { 'content-type': doc.type });
        fs.createReadStream(`./src/archivos/${doc.route}`).on('error', function(error){
            console.log('FileService(docSend): ', error.message);
          }).pipe(res);
    };

    public async getFiles(req: Request, res: Response) {
        try {
            const body = await decodeModel(req.params.id);

            //const filter = {
            //    "$and": [
            //        body.filter
            //    ]
            //}
            File.find(body.filter, null, { sort: { date: -1 } }).limit(body.limit? body.limit : 5).exec( (err: any, files: IFile[]) => {
                if (!err) {
                    const data = encodeModel(files);
                    res.status(200).send({ successed: true, key: data });
                } else {
                    res.status(200).send({ successed: false });
                }
            })
        } catch (error) {
            res.status(404).send({ successed: false });
        };
    };

    public async deleteFile(req: Request, res: Response) {

        const fs = require('fs').promises;
        const resp = req.params.id;
        const body = await decodeModel(resp);
        const access = await super.getAccess(body.key);
        
        if (access.status) {
            console.log("Se ha intentado Eliminar un Archivo")
            
            await File.find(body.filter, (err:Error, files: IFile[])=>{
                if(!err){
                    for(let file of files){
                        fs.unlink(`./src/archivos/${file.route}`)
                        .then(() => {
                            console.log(`se ha Eliminado el Archivo: ${file.route} Por ${access.user.user_name}`)
                        }).catch((err:any) => {
                            console.log('Algo salio mal al intentar eliminar un archivo', err)
                        });
                    };
                };
            })

            File.deleteMany(body.filter, {}, (err: any)=>{
                if(!err){
                    res.status(200).send({ successed: true, message: 'Archivo Eliminado' });
                };
            });

        };
    };
    
    public async uploadFile(req: Request, res: Response) {
        const resp = req.headers.body!.toString()!;
        const body = await decodeModel(resp);
        const access = await super.getAccess(body.key);

        if (access.status && req.files) {

            const efile = req.files.file as UploadedFile;
            const nameArray = efile.name.split(".");
            const route: string = access.user.user_nick + "-" + efile.name;

            const file: IFile = new File({
                name: efile.name,
                size: efile.size,
                ext: nameArray[nameArray.length - 1],
                type: efile.mimetype,
                description: body.description ? body.description : "SIN DESCRICION",
                father: body.father ? body.father : "NONE",
                user: access.user,
                route: route,
                date: new Date(),
            });

            file.save((err: any) => {
                if (!err) {
                    efile.mv(`./src/archivos/${route}`, (err: any) => {
                        if (err) {
                            res.status(404).send({ message: err })
                        } else {
                            res.status(200).send({ successed: true, message: 'File upload' })
                        }
                    });
                } else {
                    console.log("Files.service: Ha ocurrido un error al intentar subir un archivo(uploadFile)");
                };
            });

        };
    };
}