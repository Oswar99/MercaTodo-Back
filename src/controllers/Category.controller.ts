import {Application} from "express";
import { CategoryService } from "../services/Category.service";

export class CategoryController{
    
    private category_controller: CategoryService;
    constructor(private app: Application){
        this.category_controller = new CategoryService();
        this.routes();
    };

    private routes(){           
        this.app.route("/categories")
            .post(this.category_controller.newCategory);
        this.app.route("/categories/:id")
            .get(this.category_controller.getCategoryByFilter)
            .delete(this.category_controller.deleteCategory);
    };
};