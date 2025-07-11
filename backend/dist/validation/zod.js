"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlog = exports.createBlog = exports.signin = exports.signup = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signup = zod_1.default.object({
    name: zod_1.default.string(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6)
});
exports.signin = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6)
});
exports.createBlog = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string()
});
exports.updateBlog = zod_1.default.object({
    id: zod_1.default.string(),
    title: zod_1.default.string().optional(),
    content: zod_1.default.string().optional(),
});
