import { Request, Response } from "express";
import { decodeModel, encodeModel } from "../helpers/jwt.helper";
import SessionHelper from "../helpers/Session.helper";
import { File } from "../models/file.model";
import { IProduct, Product } from "../models/product.model";

export class ProductService extends SessionHelper {

    public async newProduct(req: Request, res: Response) {
        console.log("pro")
        try {
            const body = await decodeModel(req.body.key);
            const access = await super.getAccess(body.key);

            if (access.status) {
                const data = body.data;
                const product: IProduct = new Product({
                    user: access.user,
                    marca: data.marca,
                    modelo: data.modelo,
                    name: data.nombre,
                    description: data.descripcion,
                    tag: data.etiquetas,
                    value: data.valor_de_venta,
                    date: new Date(),
                    count: data.cantidad,
                    category: body.category
                });

                product.save((err: any, product: IProduct) => {
                    if (!err) {
                        res.status(200).json({ successed: true, father: product._id })
                    } else {
                        res.status(200).json({ successed: false })
                        console.log(err.message);
                    };
                });
            };
        } catch (error) {
            res.status(404).json({ successed: false })
        };
    };

    public async delProduct(req: Request, res: Response) {
        try {
            const body = await decodeModel(req.params.id);
            const access = await super.getAccess(body.key);

            if (access.status) {
                await Product.deleteMany(body.filter);
                await File.deleteMany({ father: body.id })
                res.status(200).json({ successed: true });
            };

        } catch (error) {
            res.status(404).json({ successed: false })
        };
    };

    public async updateProduct(req: Request, res: Response) {
        try {
            const body = await decodeModel(req.body.key);
            const access = await super.getAccess(body.key);

            const dataBody = {
                product_id: body.data.id,
                marca: body.data.marca,
                modelo: body.data.modelo,
                name: body.data.nombre,
                description: body.data.descripcion,
                tag: body.data.etiquetas,
                value: body.data.valor_de_venta,
                purchase_value: body.data.valor_de_compra,
                count: body.data.cantidad,
            };

            if (access.status) {
                Product.findOneAndUpdate({ _id: body.product }, dataBody, null, (err: any, doc: any) => {
                    if (!err) {
                        console.log(doc)
                        res.status(200).json({ successed: true, father: doc._id });
                    } else {
                        res.status(200).json({ successed: false });
                    };
                });
            };

        } catch (error) {
            res.status(404).json({ successed: false });
        };
    };

    public async getAllP(req: Request, res: Response) {
        try {
            const body = await decodeModel(req.params.id);
            
            Product.countDocuments(body.filter).then(y=>{
                Product.find(body.filter, null, { sort: { date: -1 } }).skip(body.skip? body.skip : 0).limit(body.limit ? body.limit : 100).exec((err: any, products: IProduct[]) => {
                    if (!err) {
                        const data = encodeModel(products);
                        res.status(200).json({ successed: true, key: data, count: y })
                    } else {
                        res.status(200).json({ successed: false })
                        console.log(err.message);
                    };
                });
            });
        } catch (error) {
            res.status(404).json({ successed: false });
        };
    };

    public async getAllProducts(req: Request, res: Response) {
        try {
            const body = await decodeModel(req.params.id);
            const access = await super.getAccess(body.key);

            if (access.status) {
                const filter = {
                    "$and": [
                        { user: access.user._id },
                        body.filter,
                    ]
                };
                Product.find(filter, null, { sort: { date: -1 } }).limit(body.limit ? body.limit : 100).exec((err: any, products: IProduct[]) => {
                    if (!err) {
                        const data = encodeModel(products);
                        res.status(200).json({ successed: true, key: data })
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

    public async getProductByFilter(req: Request, res: Response) {
        try {
            const body = await decodeModel(req.params.id);

            //const filter = {
            //    "$and": [
            //        body.filter,
            //    ]
            //};

            Product.find(body.filter, (err: Error, products: IProduct[]) => {
                if (!err) {
                    const data = encodeModel(products);
                    res.status(200).json({ successed: true, key: data })
                } else {
                    res.status(200).json({ successed: false })
                    console.log(err.message);
                };
            });
        } catch (error) {
            res.status(404).json({ successed: false });
        };
    };

    public async getTop5(req: Request, res: Response) {
        try {
            const body = await decodeModel(req.params.id);

            const filter = {
                "$and": [
                    body.filter,
                ]
            };
            Product.find(filter, null, { sort: { date: -1 } }).limit(8).exec((err: any, products: IProduct[]) => {
                if (!err) {
                    const data = encodeModel(products);
                    res.status(200).json({ successed: true, key: data })
                } else {
                    res.status(200).json({ successed: false })
                    console.log(err.message);
                };
            });
        } catch (error) {
            res.status(404).json({ successed: false });
        };
    };

}