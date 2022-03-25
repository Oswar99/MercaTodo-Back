import {Application} from "express";
import { ChatService } from "../services/chat.service";

export class ChatController{
    
    private chat_cont: ChatService;
    constructor(private app: Application){
        this.chat_cont = new ChatService();
        this.routes();
    };

    private routes(){           
        this.app.route("/chat")
            .post(this.chat_cont.newChat);

        this.app.route("/chats/:id")
            .get(this.chat_cont.getChats)
            .delete(this.chat_cont.delChat);

        this.app.route("/messages/:id")
            .get(this.chat_cont.getMessages)
    };
};