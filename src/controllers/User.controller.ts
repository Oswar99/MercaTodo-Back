import {Application} from "express";
import { UserService } from "../services/User.service";

export class UserController{
    
    private user_controller: UserService;
    constructor(private app: Application){
        this.user_controller = new UserService();
        this.routes();
    };

    private routes(){           
        this.app.route("/users")
            .post(this.user_controller.register)
            //.get(this.user_controller.setAdmin);
    };
};