"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controller/productController");
const router = (0, express_1.Router)();
router.get("/", productController_1.getAllProducts);
router.post("/:p_id", productController_1.getProduct);
router.post("/create", productController_1.createProduct);
exports.default = router;
