import { Request, Response, Router } from "express";
import {
  getAllProducts,
  createProduct,
  getProduct,
} from "../controller/productController";

const router = Router();
router.get("/", getAllProducts);
router.post("/:p_id", getProduct);
router.post("/", createProduct);
export default router;
