import { Schema, model } from "mongoose";
import Product from "../types/ProductType";

const ProductSchema = new Schema({
  p_id: {
    type: String,
    unique: true,
  },
  name: { type: String },
  desc: { type: String },
  seller: { type: String },
  colors: [{ type: String }],
  price: { type: Number },
  stock: { type: Number },
  category: { type: String },
});
export default model<Product>("products", ProductSchema);
