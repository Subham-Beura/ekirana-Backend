import { Request, Response } from "express";
import Product from "../models/ProductModel";
export const getAllProducts = async (req: Request, res: Response) => {
  const productList = await Product.find();
  console.log(productList);
  res.setHeader("Content-Type", "application/json");
  if (!productList) {
    res.json(null).sendStatus(200);
  }
  res.json({ msg: "Hello World" });
};
export const getProduct = (req: Request, res: Response) => {
  res.send("Give Product");
};
export const createProduct = (req: Request, res: Response) => {
  res.send("Product Created");
};
export const updateProduct = (req: Request, res: Response) => {
  res.send("Product Created");
};
export const deleteProduct = (req: Request, res: Response) => {
  res.send("Product Deleted");
};
