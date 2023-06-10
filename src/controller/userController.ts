import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import User from "../types/UserType";
export const fetchAllUsers = async (req: Request, res: Response) => {
  const allUsers = await UserModel.find();
  res.json(allUsers);
};

export const fetchUser = async (req: Request, res: Response) => {
  let emp_id = req.params.emp_id;
  console.log(emp_id);
  const user: User | null = await UserModel.findOne({
    emp_id,
  });
  console.log(user);
  return res.json({
    success: true,
    msg: "User Sent",
    user: user,
  });
};
export const updateUser = async (req: Request, res: Response) => {
  const emp_id = req.params.emp_id;
  let data = req.body;
  //Find and Update User Doc
  let user = await UserModel.findOneAndUpdate({ emp_id }, data, { new: true });
  // await user.updateOne(data);
  user?.save();
  //Find updated doc and send it back
  user = await UserModel.findOne({ emp_id });
  return res.json({
    data: req.body,
    user,
  });
};
