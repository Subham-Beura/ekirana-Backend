"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.fetchUser = exports.fetchAllUsers = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const fetchAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield UserModel_1.default.find();
    res.json(allUsers);
});
exports.fetchAllUsers = fetchAllUsers;
const fetchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let emp_id = req.params.emp_id;
    console.log(emp_id);
    const user = yield UserModel_1.default.findOne({
        emp_id,
    });
    console.log(user);
    return res.json({
        success: true,
        msg: "User Sent",
        user: user,
    });
});
exports.fetchUser = fetchUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emp_id = req.params.emp_id;
    let data = req.body;
    //Find and Update User Doc
    let user = yield UserModel_1.default.findOneAndUpdate({ emp_id }, data, { new: true });
    // await user.updateOne(data);
    user === null || user === void 0 ? void 0 : user.save();
    //Find updated doc and send it back
    user = yield UserModel_1.default.findOne({ emp_id });
    return res.json({
        data: req.body,
        user,
    });
});
exports.updateUser = updateUser;
