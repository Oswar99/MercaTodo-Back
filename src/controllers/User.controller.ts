import {Application} from "express";
import { UserService } from "../services/User.service";

export class UserController{
    
    private user_controller: UserService;
    constructor(private app: Application){
        this.user_controller = new UserService();
        this.routes();
    };

    private routes(){
        
        this.app.route("/user")
            .put(this.user_controller.updateUser);

        this.app.route("/users")
            .post(this.user_controller.register)
            .put(this.user_controller.sendMailU);

        this.app.route("/user/:id")
            .get(this.user_controller.getUser)

        this.app.route("/verify")
            .put(this.user_controller.verifyEmail);
            //.get(this.user_controller.setAdmin);
    };
};