import nodemailer from "nodemailer";
import {config} from "dotenv";
import {resolve} from "path";

config({path: resolve(__dirname, "../.env")});

const transp = nodemailer.createTransport({
    host: process.env.CHS,
    port: 465,
    secure: true,
    auth:{
        user: process.env.CRR,
        pass: process.env.CPP
    }
});

class MailHelper{
    private to: string;
    private subject: string;
    private text: string;
    
    constructor(to:string, subject:string, text:string){
        this.to = to;
        this.subject = subject;
        this.text = text;
    };

    public sendMail():Promise<boolean>{
        return new Promise<boolean>(async(resolve)=>{
            const mailOps = {
                from: process.env.CRR,
                to: this.to,
                subject: this.subject,
                text: this.text
            }
    
            transp.sendMail(mailOps, (error, info)=>{
                if(error){
                    console.log(error);
                    resolve(false);
                }else{
                    console.log('Correo enviado: ' + info.response)
                    resolve(true);
                }
            });
        })
    };
}

export default MailHelper;