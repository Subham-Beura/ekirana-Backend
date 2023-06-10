import { Request, Response } from "express";

export const getAllProducts = (req: Request, res: Response) => {
  res.send("Hello World");
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
