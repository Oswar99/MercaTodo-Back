import {Application} from "express";
import { SessionService } from "../services/Session.service";

export class SessionController{
    
    private session_controller: SessionService;
    constructor(private app: Application){
        this.session_controller = new SessionService();
        this.routes();
    };

    private routes(){           
        this.app.route("/login")
            .post(this.session_controller.LogIn);

        this.app.route("/access/:id")
            .get(this.session_controller.verifyAccess);
    };
};