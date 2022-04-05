import { Request, Response } from "express";
import { decodeModel, encodeModel } from "../helpers/jwt.helper";
import SessionHelper from "../helpers/Session.helper";
import { IReport, Report } from "../models/report.model"

export class ReportService extends SessionHelper {

    public async newReport(req: Request, res: Response) {
        try {
            const body = await decodeModel(req.body.key);
            const access = await super.getAccess(body.key);

            if (access.status) {
                const UserReport: IReport = new Report({
                    reportedBy: access.user._id,
                    userReported: body.user,
                    title: body.title,
                    description: body.description
                });
                UserReport.save((err: any) => {
                    if (!err) {
                        res.status(200).json({ successed: true });
                    };
                });
            };
        } catch (error) {
            res.status(404).json({ successed: false });
        };
    };

    public async getReports(req: Request, res: Response) {
        const body = await decodeModel(req.params.id);
        const access = await super.getAccess(body.key);
        if (access.status) {
            Report.aggregate([
                {
                    "$lookup": {
                        from: "users",
                        localField: "userReported",
                        foreignField: "_id",
                        as: "reported"
                    }
                },
                {
                    "$lookup": {
                        from: "users",
                        localField: "reportedBy",
                        foreignField: "_id",
                        as: "informer"
                    }
                },
                { "$match": { active: true } },
                { "$sort": { date: -1 } },
                { "$limit": 10 }

            ], (err: any, Reports: IReport[]) => {
                if (!err) {
                    console.log(Reports)
                    res.status(200).json({ successed: true, key: encodeModel(Reports) })
                } else {
                    res.status(200).json({ successed: false })
                };
            });

        };
    };

    public async setActiveFalse(req: Request, res: Response) {
        const body = await decodeModel(req.body.key);
        const access = await super.getAccess(body.key);
        if (access.status) {
            Report.findOneAndUpdate({ _id: body.report }, (err: any) => {
                if (!err) {
                    res.status(200).json({ successed: true })
                } else {
                    res.status(200).json({ successed: false })
                };
            });
        };
    };

};