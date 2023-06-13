import { Request, Response, Router } from "express";
import {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
} from "../controller/productController";

const router = Router();
router.get("/", getAllProducts);
router.get("/:p_id", getProduct);
router.post("/", createProduct);
router.put("/:p_id", updateProduct);
export default router;
