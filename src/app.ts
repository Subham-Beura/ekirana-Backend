import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import { auth } from "./middleware/auth";
const app: Express = express();
const port = process.env.PORT || 3999;

import dotenv from "dotenv";

dotenv.config();
app.use(bodyParser.json());
app.use(cors());
// mongoose.connect("mongodb://localhost:27016/PSS");
const dbURL: string | undefined = process.env.MONGODB_ATLAS_URL;
if (typeof dbURL == "string") {
  mongoose.connect(dbURL);
  console.log("Database connected");
} else console.log("DB URL not found");
mongoose.set("strictQuery", false);
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World").sendStatus(200);
});
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
// app.use(auth);
app.use("/user", userRoutes);
export default app;
