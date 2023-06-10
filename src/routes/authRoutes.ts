import { Router } from "express";
import {
  register,
  login,
  getAllUsers,
  changePassword,
} from "../controller/authController";
import { auth } from "../middleware/auth";
const router = Router();

router.get("/", auth, getAllUsers);

router.post("/register", register);
router.post("/login", login);
router.post("/changepassword/:emp_id", auth, changePassword);
export default router;
