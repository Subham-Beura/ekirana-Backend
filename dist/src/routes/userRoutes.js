"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
router.get("/", userController_1.fetchAllUsers);
router.get("/:emp_id", userController_1.fetchUser);
router.put("/:emp_id", userController_1.updateUser);
exports.default = router;
