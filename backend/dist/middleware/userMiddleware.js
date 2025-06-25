"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userMiddleware = (req, res, next) => {
    var _a, _b, _c;
    if (req.path === "/bulk") {
        return next(); // skip auth for /bulk
    }
    try {
        const token = (_b = (_a = req.signedCookies) === null || _a === void 0 ? void 0 : _a.token) !== null && _b !== void 0 ? _b : (_c = req.cookies) === null || _c === void 0 ? void 0 : _c.token;
        if (!token) {
            res.status(401).json({ msg: "Token missing" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded.userId) {
            res.status(401).json({ msg: "Unauthorized request" });
            return;
        }
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        res.status(401).json({ msg: "Invalid token" });
        return;
    }
};
exports.default = userMiddleware;
