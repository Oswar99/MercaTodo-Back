import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import cors from "cors";
import compression from "compression";

import { resolve } from "path";
import { config } from "dotenv";

import { SessionController } from "./controllers/Session.controller";
import { UserController } from "./controllers/User.controller";
import { FileController } from "./controllers/File.controller";
import { CategoryController } from "./controllers/Category.controller";
import { ProductController } from "./controllers/Product.controller";

config({ path: resolve(__dirname, "../.env") });

//const m = new MailHelper("oswar.cruzn499@gmail.com","prueba","esta es una prueba");

class App {
    public app: Application;
    public session_controller : SessionController;
    public user_controller : UserController;
    public file_controller : FileController;
    public cat_controller : CategoryController;
    public pro_controller : ProductController;


    constructor() {
        this.app = express();
        this.setConfig();
        this.setMongoConfig();

        
        this.session_controller = new SessionController(this.app);
        this.user_controller = new UserController(this.app);
        this.file_controller = new FileController(this.app);
        this.cat_controller = new CategoryController(this.app);
        this.pro_controller = new ProductController(this.app);

    };

    private setConfig() {

        this.app.use(fileUpload());
        this.app.use(compression());
        this.app.use(express.json({ limit: "50mb" }));
        this.app.use(express.urlencoded({ limit: "50mb", extended: true }));
        this.app.use(cors());

        this.app.use(async (req: Request, res: Response, next) => {
            next();
        });     
    };

    private setMongoConfig() {
        mongoose.Promise = global.Promise;

        mongoose.connect(process.env.MNG_URI!, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err: any) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log("Base de datos Conectada!");
            }
        });
    };

};




export default new App().app