import { Request, Response } from "express";
import Product from "../models/ProductModel";
export const getAllProducts = async (req: Request, res: Response) => {
  const productList = await Product.find();
  res.setHeader("Content-Type", "application/json");
  if (!productList) {
    res.json({ msg: "No Products Found" }).sendStatus(404);
  }
  res.json({ succes: true, data: productList });
};
export const getProduct = (req: Request, res: Response) => {
  res.send("Give Product");
};
export const createProduct = async (req: Request, res: Response) => {
  const newProduct = new Product(req.body);
  let product;
  try {
    product = await newProduct.save();
  } catch (err) {
    console.log(err);
    res.status(500);
  }
  res.status(201);
  res.json({
    success: true,
    data: product,
  });
};

export const updateProduct = (req: Request, res: Response) => {
  res.send("Product Created");
};
export const deleteProduct = (req: Request, res: Response) => {
  res.send("Product Deleted");
};
