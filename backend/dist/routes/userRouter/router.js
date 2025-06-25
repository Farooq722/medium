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
const express_1 = __importDefault(require("express"));
const zod_1 = require("../../validation/zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const userRouter = express_1.default.Router();
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /* if i destucture like this { data } then this wont prinst this
          {
          success: true,
          data: { name: 'B Farooq', email: 'farooq@gmail.com', password: 'far123'
          }
      }
      */
    const data = zod_1.signup.safeParse(req.body);
    if (!data.success) {
        res.status(400).json({
            msg: "Validation failed buddy",
            success: false,
            error: true,
        });
        return;
    }
    const isUserExits = yield prisma.user.findUnique({
        where: {
            email: data.data.email,
        },
    });
    if (isUserExits) {
        res.status(201).json({
            msg: "User already exits",
            success: false,
            error: true,
        });
        return;
    }
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashPassword = yield bcrypt_1.default.hash(data.data.password, salt);
    try {
        const newUser = yield prisma.user.create({
            data: {
                name: data.data.name,
                email: data.data.email,
                password: hashPassword,
            },
        });
        res.status(200).json({
            user: {
                name: newUser.name,
                email: newUser.email,
            },
            msg: "User created successfull",
            success: true,
            error: false,
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            msg: "Internal server error",
            success: false,
            error: true,
        });
        return;
    }
}));
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parseData = zod_1.signin.safeParse(req.body);
    if (!parseData.success) {
        res.status(400).json({
            msg: "Validation failed buddy",
            success: false,
            error: true,
        });
        return;
    }
    try {
        const isUserExits = yield prisma.user.findUnique({
            where: {
                email: parseData.data.email,
            },
        });
        const checkPassword = yield bcrypt_1.default.compare(parseData.data.password, isUserExits === null || isUserExits === void 0 ? void 0 : isUserExits.password);
        if (!isUserExits) {
            res.status(404).json({
                msg: "User Not Found",
                success: false,
                error: true,
            });
            return;
        }
        if (!checkPassword) {
            res.status(400).json({
                msg: "Invalid Credentials",
                success: false,
                error: true,
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            userId: isUserExits.id,
        }, process.env.JWT_SECRET, { expiresIn: "7d" });
        const cookieOption = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            path: "/"
        };
        res.cookie("token", token, cookieOption);
        res.status(200).json({
            msg: "Login successfully",
            success: true,
            error: false,
            token: token
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal server error",
            success: false,
            error: true,
        });
        return;
    }
}));
exports.default = userRouter;
