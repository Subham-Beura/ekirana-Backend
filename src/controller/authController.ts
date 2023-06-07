import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel";
import { SECRET_KEY, TokenRequest } from "../middleware/auth";

export async function register(req: Request, res: Response) {
  console.log((req as TokenRequest).token);

  let newUser = req.body;

  // Encryption
  // const salt = await bcrypt.genSalt(10);
  // const hash = await bcrypt.hash(newUser.password, salt);
  // newUser.password = hash;
  // Saving in DB
  const doc = new User(newUser);
  let saved = await doc.save();

  return res.json({
    success: true,
    msg: "saved",
    payload: saved,
  });
}

export async function login(req: Request, res: Response) {
  console.log("Some tried to log in");
  const { emailID, password } = req.body;
  console.log(emailID);
  let userExists = await User.findOne({ emailID });
  let test = await User.find();
  console.log(test);
  console.log(userExists);
  // Username Not Found
  if (!userExists)
    return res.json({
      success: false,
      msg: "Not User",
    });

  // wrong Password
  // let isValidPassword = await bcrypt.compare(password, userExists.password);
  let isValidPassword = userExists.password == password;
  if (!isValidPassword)
    return res.json({
      success: false,
      msg: "Wrong Password",
    });

  // Token Creation
  if (!SECRET_KEY) throw new Error("JWT_KEY must be defined");
  const token = jwt.sign(
    { emp_id: userExists.emp_id.toString(), role: userExists.role },
    SECRET_KEY,
    {
      expiresIn: "24 hours",
    }
  );
  const secondsInOneDay = 60 * 60 * 24;
  let expiry = new Date().getTime();
  expiry += secondsInOneDay * 1000;
  res.json({
    success: true,
    userExists,
    token,
    expiry,
    msg: "Welcome To PSS Dashboard",
  });
}
export async function getAllUsers(req: Request, res: Response) {
  let allUsers = await User.find();
  return res.json({ allUsers, success: true });
}

export async function changePassword(req: Request, res: Response) {
  const data = req.body;
  const emp_id = req.params.emp_id;
  console.log(emp_id);
  let user = await User.findOne({ emp_id })!;
  if (user?.password != data.oldPassword)
    return res.json({
      success: false,
      msg: "Wrong Password",
    });
  // if (!bcrypt.compare(user?.password!, data.oldPassword))
  //   console.log("Wrong Password");
  // const salt = await bcrypt.genSalt(10);
  // const hash: string = await bcrypt.hash(data.newPassword1, salt);
  let newUser = user;
  newUser!.password = data.newPassword1;
  // newUser!.password = hash;
  const doc = new User(newUser);
  console.log(doc);
  let saved = await doc.save();

  return res.json({
    success: true,
    msg: "Password Changed",
  });
}
