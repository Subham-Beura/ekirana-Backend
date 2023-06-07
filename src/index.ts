import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import { auth } from "./middleware/auth";
const app: Express = express();
const port = process.env.PORT || 4000;

import dotenv from "dotenv";

dotenv.config();
app.use(bodyParser.json());
app.use(cors());
// mongoose.connect("mongodb://localhost:27017/PSS");
const dbURL: string | undefined = process.env.MONGODB_ATLAS_URL;
if (typeof dbURL == "string")
  mongoose.connect(dbURL).then(() => {
    console.log("Connected To DB");
  });
else console.log("DB URL not found");
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

app.use("/auth", authRoutes);
app.use(auth);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`⚡️ Server is running at http://localhost:${port}`);
});
