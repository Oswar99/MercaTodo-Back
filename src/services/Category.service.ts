import { Console } from "console";
import { Request, Response } from "express";
import { decodeModel, encodeModel } from "../helpers/jwt.helper";
import SessionHelper from "../helpers/Session.helper";
import { Category, ICategory } from "../models/category.model";

export class CategoryService extends SessionHelper {

    public async deleteCategory(req: Request, res: Response) {
        try {
            const body = await decodeModel(req.params.id);
            const access = await super.getAccess(body.key);

            if (access.status) {
                Category.findOneAndDelete(body.filter, null, (err: any) => {
                    if (!err) {
                        res.status(200).json({ successed: true });
                    };
                });
            };
        } catch (error) {
            res.status(404).json({ successed: false });
        };
    };

    public async newCategory(req: Request, res: Response) {
        console.log("dasd")
        try {
            const body = await decodeModel(req.body.key);
            const access = await super.getAccess(body.key);

            if (access.status) {
                const category: ICategory = new Category({
                    user: access.user,
                    name: body.name,
                    father: body.father ? body.father : "main",
                    date: new Date(),
                });

                Category.find({ name: body.name }, (err: Error, categories: ICategory[]) => {
                    if (!err && categories.length === 0) {
                        category.save((err: any, category: ICategory) => {
                            if (!err) {
                                res.status(200).json({ successed: true, father: category._id })
                            } else {
                                res.status(200).json({ successed: false })
                                console.log(err.message);
                            };
                        });
                    } else {
                        res.status(200).json({ successed: false })
                        console.log(err ? err.message : "La categoria ya existe");
                    };
                });
            };
        } catch (error) {
            res.status(404).json({ successed: false });
        };
    };

    public async getCategoryByFilter(req: Request, res: Response) {
        try {
            const body = await decodeModel(req.params.id);
            const filter = {
                "$and": [
                    { shop: body.shop },
                    body.filter ? body.filter : {},
                ]
            };

            Category.find(filter, null, { sort: { date: -1 } }).exec((err: any, categories: ICategory[]) => {
                if (!err) {
                    const data = encodeModel(categories);
                    res.status(200).json({ successed: true, key: data })
                } else {
                    res.status(200).json({ successed: false })
                    console.log(err.message);
                };
            });

        } catch (error) {
            res.status(404).send({ successed: false });
        };
    };

}