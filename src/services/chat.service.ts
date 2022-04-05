import { Request, Response } from "express";
import { decodeModel, encodeModel } from "../helpers/jwt.helper";
import SessionHelper from "../helpers/Session.helper";
import { Chat, IChat } from "../models/chat.model";

export class ChatService extends SessionHelper {

    public async delChat(req: Request, res: Response) {
        try {
            const body = await decodeModel(req.params.id);
            const access = await super.getAccess(body.key);

            if (access.status) {
                Chat.findOneAndDelete(body.filter, null, (err: any) => {
                    if (!err) {
                        res.status(200).json({ successed: true });
                    };
                });
            };
            
        } catch (error) {
            res.status(404).json({ successed: false });
        };
    };

    public async newChat(req: Request, res: Response) {
        try {
            const body = await decodeModel(req.body.key);
            const access = await super.getAccess(body.key);

            if (access.status) {
                const chat: IChat = new Chat(body.data);
                chat.save((err: any) => {
                    if (!err) {
                        res.status(200).json({ successed: true })
                    } else {
                        res.status(200).json({ successed: false })
                        console.log(err.message);
                    };
                });
            };
        } catch (error) {
            res.status(404).json({ successed: false });
        };
    };

    public async getChats(req: Request, res: Response) {
        try {
            const body = await decodeModel(req.params.id);
            const access = await super.getAccess(body.key);
            if (access.status) {
                Chat.distinct("id", { from: access.user._id }, (err:any, result:any) => {
                    if(!err){
                        const data = encodeModel(result);
                        res.status(200).json({ successed: true, key: data });
                    } else {
                        res.status(200).json({ successed: false });
                    };
                });
            }else{
                res.status(200).json({ successed: false });
            };

        } catch (error) {
            res.status(404).send({ successed: false });
        };
    };

    public async getMessages(req: Request, res: Response) {
        try {
            const body = await decodeModel(req.params.id);
            const access = await super.getAccess(body.key);
            if (access.status) {

                const filter = {
                    "$and": [
                        { "$or": [{from: access.user._id }, {of: access.user._id}] },
                        body.filter ? body.filter : {},
                    ]
                };
            
                Chat.find(filter, (err: any, chat: IChat[]) => {
                    if (!err) {
                        const data = encodeModel(chat);
                        res.status(200).json({ successed: true, key: data });
                    } else {
                        res.status(200).json({ successed: false });
                        console.log(err.message);
                    };
                });
            }else{
                res.status(200).json({ successed: false });
            }
        } catch (error) {
            res.status(404).send({ successed: false });
        };
    };

}