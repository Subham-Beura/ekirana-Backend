"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3999;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// mongoose.connect("mongodb://localhost:27016/PSS");
const dbURL = process.env.MONGODB_ATLAS_URL;
if (typeof dbURL == "string") {
    mongoose_1.default.connect(dbURL);
    console.log("Database connected");
}
else
    console.log("DB URL not found");
mongoose_1.default.set("strictQuery", false);
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});
app.get("/", (req, res) => {
    res.send("Hello World").sendStatus(200);
});
app.use("/auth", authRoutes_1.default);
app.use("/products", productRoutes_1.default);
// app.use(auth);
app.use("/user", userRoutes_1.default);
exports.default = app;
