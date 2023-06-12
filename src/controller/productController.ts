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

export const getProduct = async (req: Request, res: Response) => {
  const p_id = req.params.p_id;
  let user = await Product.findOne({ p_id: p_id });
  res.setHeader("Content-Type", "application/json");
  // If Product not found
  if (!user) {
    res.status(404);
    res.setHeader("Content-Type", "application/json");
    return res.json({ succes: false, msg: "No Product Found" });
  }
  res.json({ succes: true, data: user });
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
