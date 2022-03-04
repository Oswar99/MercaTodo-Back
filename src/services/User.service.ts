import { Request, Response } from "express";
import moment from "moment";
import { decodeModel, decodeResp, encodeModel } from "../helpers/jwt.helper";
import SessionHelper from "../helpers/Session.helper";
import { IUser, User } from "../models/user.model";

export class UserService extends SessionHelper {

    public async setAdmin(req: Request, res: Response) {
        const us1: IUser = new User({
            user_name: "",
            user_mail: "",
            user_nick: "",
            user_pass: encodeModel(""),
            user_type: "",
        });

        us1.save((err: any) => {
            if (err) throw err;
            res.status(200).json({ successed: true })
        });
    };

    public async register(req: Request, res: Response) {
        const body = await decodeModel(req.body.key);
        const data = body.data;
        console.log(data)
        const us1: IUser = new User({
            user_name: data.nombre,
            user_mail: data.email,
            user_nick: data.nick,
            user_phone: data.phone,
            user_address: data.address,
            user_pass: encodeModel(data.pass),
            user_type: "USUARIO",
        });

        us1.save((err: any) => {
            if (!err) {
                res.status(200).json({ successed: true })
            } else {
                res.status(200).json({ successed: false });
                console.log(err.message);
            };
        });
    };

    public async updatePass(req: Request, res: Response) {
        const body = await decodeModel(req.body.key);
        const access = await super.getAccess(body.key);

        if (access.status) {
            const user = await super.updateUsers({ _id: access.user }, { user_pass: encodeModel(body.data.pass) });
            if (user.length > 0) {
                res.status(200).json({ successed: true })
            } else {
                res.status(200).json({ successed: false })
            };
        };
    };

}