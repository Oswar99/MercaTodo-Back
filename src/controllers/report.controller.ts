import {Application} from "express";
import { ReportService } from "../services/report.service";

export class ReportController{
    
    private report_cont: ReportService;
    constructor(private app: Application){
        this.report_cont = new ReportService();
        this.routes();
    };

    private routes(){           
        this.app.route("/report")
            .post(this.report_cont.newReport);

        this.app.route("/report/:id")
            .get(this.report_cont.getReports);
    };
};