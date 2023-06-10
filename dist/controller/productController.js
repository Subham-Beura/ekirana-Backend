"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProduct = exports.getAllProducts = void 0;
const getAllProducts = (req, res) => {
    res.send("Hello World");
};
exports.getAllProducts = getAllProducts;
const getProduct = (req, res) => {
    res.send("Give Product");
};
exports.getProduct = getProduct;
const createProduct = (req, res) => {
    res.send("Product Created");
};
exports.createProduct = createProduct;
const updateProduct = (req, res) => {
    res.send("Product Created");
};
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => {
    res.send("Product Deleted");
};
exports.deleteProduct = deleteProduct;
