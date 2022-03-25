import { Chat, IChat } from "../models/chat.model";

class ChatHelper {

    public getChatsByFilter(filter: any): Promise<IChat[]> {
        return new Promise<IChat[]>((resolve) => {
            Chat.find(filter, (err: Error, users: IChat[]) => {
                if (err) {
                    console.log("UserHelper: ha ocurrido un error en user.find de getUsers.");
                } else {
                    resolve(users);
                };
            });
        });
    };

    public newChat(data: any): Promise<any> {
        return new Promise<any>((resolve) => {
            const chat: IChat = new Chat(data);
            chat.save((err: any, chat: IChat) => {
                if (!err) {
                    Chat.find({id: chat.id}, (err:Error, chats:IChat[]) =>{
                        if(!err){
                            resolve(chats)
                        };
                    });
                } else {
                    console.log(err.message);
                };
            });
        });
    };

};

export default ChatHelper;