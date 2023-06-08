import { Request, Response, Router } from "express";
import { getAllProducts } from "../controller/productController";

const router = Router();
router.get("/", getAllProducts);

export default router;
