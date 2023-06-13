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

export const updateProduct = async (req: Request, res: Response) => {
  const p_id = req.params.p_id;

  const product = await Product.findOneAndUpdate({ p_id }, req.body, {
    new: true,
  });

  // User Not found
  if (!product)
    return res.status(404).json({ succes: false, msg: "Product not found" });

  product?.save();
  res.status(200);
  res.json({ success: true, data: product });
};
export const deleteProduct = async (req: Request, res: Response) => {
  const p_id = req.params.p_id;
  const product = await Product.findOneAndDelete({ p_id }).exec();
  if (!product)
    return res.status(404).json({ succes: false, msg: "Product not found" });
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.json({
    success: true,
    data: product,
  });
};
