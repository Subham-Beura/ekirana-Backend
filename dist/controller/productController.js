"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProduct = exports.getAllProducts = void 0;
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productList = yield ProductModel_1.default.find();
    res.setHeader("Content-Type", "application/json");
    if (!productList) {
        res.json({ msg: "No Products Found" }).sendStatus(404);
    }
    res.json({ succes: true, data: productList });
});
exports.getAllProducts = getAllProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const p_id = req.params.p_id;
    let user = yield ProductModel_1.default.findOne({ p_id: p_id });
    res.setHeader("Content-Type", "application/json");
    // If Product not found
    if (!user) {
        res.status(404);
        res.setHeader("Content-Type", "application/json");
        return res.json({ succes: false, msg: "No Product Found" });
    }
    res.json({ succes: true, data: user });
});
exports.getProduct = getProduct;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = new ProductModel_1.default(req.body);
    let product;
    try {
        product = yield newProduct.save();
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
    res.status(201);
    res.json({
        success: true,
        data: product,
    });
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const p_id = req.params.p_id;
    const product = yield ProductModel_1.default.findOneAndUpdate({ p_id }, req.body, {
        new: true,
    });
    // User Not found
    if (!product)
        return res.status(404).json({ succes: false, msg: "Product not found" });
    product === null || product === void 0 ? void 0 : product.save();
    res.status(200);
    res.json({ success: true, data: product });
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const p_id = req.params.p_id;
    const product = yield ProductModel_1.default.findOneAndDelete({ p_id }).exec();
    if (!product)
        return res.status(404).json({ succes: false, msg: "Product not found" });
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.json({
        success: true,
        data: product,
    });
});
exports.deleteProduct = deleteProduct;
