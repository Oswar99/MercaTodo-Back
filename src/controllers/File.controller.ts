import {Application} from "express";
import { FileService } from "../services/Files.service";

export class FileController{
    
    private file_controller: FileService;
    constructor(private app: Application){
        this.file_controller = new FileService();
        this.routes();
    };

    private routes(){           
        this.app.route("/files")
            .post(this.file_controller.uploadFile);
            
        this.app.route("/files/:id")
            .get(this.file_controller.getFiles)
            .delete(this.file_controller.deleteFile);
            
        this.app.route("/file/:id")
            .get(this.file_controller.docSend);
    };
};