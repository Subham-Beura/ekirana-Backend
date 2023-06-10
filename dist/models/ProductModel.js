"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)("products", ProductSchema);
