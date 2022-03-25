import { Request, Response } from "express";
import { decode } from "jwt-simple";
import moment from "moment";
import { decodeModel, decodeResp, encodeModel } from "../helpers/jwt.helper";
import MailHelper from "../helpers/mail.helper";
import SessionHelper from "../helpers/Session.helper";
import UserHelper from "../helpers/User.helper";
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
        const us1: IUser = new User({
            user_name: data.nombre,
            user_mail: data.email,
            user_nick: data.nick,
            user_phone: data.phone,
            user_address: data.address,
            user_dep: data.dep,
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

    public async sendMailU(req: Request, res: Response){
        const body = await decodeModel(req.body.key);
        const access = await super.getAccess(body.key);

        if (access.status) {
            const data = {
                end: moment().add(5, "minutes"),
                user: access.user._id
            };
            const m = new MailHelper(access.user.user_mail, "VERIFICACION DE CUENTA DE USUARIO", `Para verificar su cuenta ingrese a: http://localhost:3000/#/verify/${encodeModel(data)}`);
            if(await m.sendMail()){
                res.status(200).json({successed:true});
            }else{
                res.status(200).json({successed:false});
            };
        };
    };

    public async getUser(req: Request, res: Response){
        const body = await decodeModel(req.params.id);
        const access = await super.getAccess(body.key);

        if (access.status) {
            super.getUsers(body.filter).then(v=>{
                if(v.length > 0){
                    res.status(200).json({successed:true, key: encodeModel({
                        mail: v[0].user_mail,
                        name: v[0].user_name,
                        dep: v[0].user_dep
                    })});
                }else{
                    res.status(200).json({successed:false});
                };
            });
        };
    };

    public async verifyEmail(req: Request, res: Response){
        const body = await decodeModel(req.body.key);
        const tk = await decodeModel(body.tk);
        if(tk){
            const endDate = new Date(tk.end);
            const uh:UserHelper = new UserHelper();
            if(endDate.getTime() > new Date().getTime()){
                const t = await uh.updateUsers({_id: tk.user}, {verified:true});
                if(t.nModified === 1){
                    res.status(200).json({successed:true});
                }else{
                    res.status(200).json({successed:false});
                };
            }else{
                res.status(200).json({successed:false});
            };
        };
    };

}