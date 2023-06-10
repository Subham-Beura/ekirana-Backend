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
exports.changePassword = exports.getAllUsers = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const auth_1 = require("../middleware/auth");
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.token);
        let newUser = req.body;
        // Encryption
        // const salt = await bcrypt.genSalt(10);
        // const hash = await bcrypt.hash(newUser.password, salt);
        // newUser.password = hash;
        // Saving in DB
        const doc = new UserModel_1.default(newUser);
        let saved = yield doc.save();
        return res.json({
            success: true,
            msg: "saved",
            payload: saved,
        });
    });
}
exports.register = register;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Some tried to log in");
        const { emailID, password } = req.body;
        console.log(emailID);
        let userExists = yield UserModel_1.default.findOne({ emailID });
        let test = yield UserModel_1.default.find();
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
        if (!auth_1.SECRET_KEY)
            throw new Error("JWT_KEY must be defined");
        const token = jsonwebtoken_1.default.sign({ emp_id: userExists.emp_id.toString(), role: userExists.role }, auth_1.SECRET_KEY, {
            expiresIn: "24 hours",
        });
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
    });
}
exports.login = login;
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let allUsers = yield UserModel_1.default.find();
        return res.json({ allUsers, success: true });
    });
}
exports.getAllUsers = getAllUsers;
function changePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        const emp_id = req.params.emp_id;
        console.log(emp_id);
        let user = yield UserModel_1.default.findOne({ emp_id });
        if ((user === null || user === void 0 ? void 0 : user.password) != data.oldPassword)
            return res.json({
                success: false,
                msg: "Wrong Password",
            });
        // if (!bcrypt.compare(user?.password!, data.oldPassword))
        //   console.log("Wrong Password");
        // const salt = await bcrypt.genSalt(10);
        // const hash: string = await bcrypt.hash(data.newPassword1, salt);
        let newUser = user;
        newUser.password = data.newPassword1;
        // newUser!.password = hash;
        const doc = new UserModel_1.default(newUser);
        console.log(doc);
        let saved = yield doc.save();
        return res.json({
            success: true,
            msg: "Password Changed",
        });
    });
}
exports.changePassword = changePassword;
