import { Request, Response } from "express";
import moment from "moment";
import { decodeModel, encodeModel, encodeResp } from "../helpers/jwt.helper";
import SessionHelper from "../helpers/Session.helper";
import { ISession, Session } from "../models/session.model";

export class SessionService extends SessionHelper {

    public async LogIn(req: Request, res: Response) {
        try {
            const body = await decodeModel(req.body.key);
            const filter: any = {
                "$and": [
                    { "$or": [{ user_mail: body.userLogin }, { user_nick: body.userLogin }] },
                    { user_pass: encodeModel(body.passLogin) }
                ]
            };
            const user = await super.getUsers(filter);

            if (user.length > 0) {
                const session: ISession = new Session({
                    user: user[0],
                    join: new Date(),
                    end: moment().add(4, "hours"),
                    last_act: new Date(),
                });

                session.save((err: any) => {
                    if (!err) {
                        res.status(200).json({ successed: true, key: encodeResp(session), user: encodeModel(user[0]) });
                    }
                });
                
            } else {
                res.status(200).json({ successed: false, message: "Credenciales no validas!" });
            };
        } catch (error) {
            console.log("Session.service: Ha ocurrido un error en LogIn al iniciar sesion");
            res.status(200).json({ successed: false, message: "Credenciales no validas!" });
        }
    };

    public async verifyAccess(req: Request, res: Response) {
        try {
            const body = await decodeModel(req.params.id);
            const access = await super.getAccess(body.key);

            if(access.status){
                res.status(200).json({ successed: true, message: "Autorizado!" });
            }else{
                res.status(404).json({ successed: false, message: "No Autorizado!" });
            };
            
        } catch (error) {
            console.log("Session.service: Ha ocurrido un error en verifyAccess");
            res.status(200).json({ successed: false, message: "Credenciales no validas!" });
        };
    };

};