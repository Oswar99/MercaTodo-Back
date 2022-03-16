import {Application} from "express";
import { ProductService } from "../services/Product.service";

export class ProductController{
    
    private product_controller: ProductService;
    constructor(private app: Application){
        this.product_controller = new ProductService();
        this.routes();
    };

    private routes(){           
        this.app.route("/products")
            .post(this.product_controller.newProduct)
            .put(this.product_controller.updateProduct);
            
            this.app.route("/products/:id")
            .get(this.product_controller.getAllProducts)
            .delete(this.product_controller.delProduct);

        this.app.route("/v1/products/:id")
            .get(this.product_controller.getProductByFilter);
        
        this.app.route("/v2/products/:id")
            .get(this.product_controller.getTop5);
            
        this.app.route("/v3/products/:id")
            .get(this.product_controller.getAllP);
    };
};