import { Request, Response, Router } from "express";
import {
  fetchAllUsers,
  fetchUser,
  updateUser,
} from "../controller/userController";

const router = Router();

router.get("/", fetchAllUsers);
router.get("/:emp_id", fetchUser);
router.put("/:emp_id", updateUser);

export default router;
