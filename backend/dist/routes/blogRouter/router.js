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
const userMiddleware_1 = __importDefault(require("../../middleware/userMiddleware"));
const zod_1 = require("../../validation/zod");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const blogRouter = express_1.default.Router();
blogRouter.post("/create-blog", userMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parseData = zod_1.createBlog.safeParse(req.body);
    if (!parseData.success) {
        res.status(400).json({
            msg: "Validation failed buddy",
            success: false,
            error: true,
        });
        return;
    }
    try {
        const userId = req.userId;
        const blog = yield prisma.post.create({
            data: {
                title: parseData.data.title,
                content: parseData.data.content,
                author: {
                    connect: { id: userId },
                },
                published: true,
            },
            include: {
                author: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        res.status(200).json({
            msg: "Post created",
            success: true,
            error: false,
            postId: blog,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Internal server error",
            success: false,
            error: true,
        });
        return;
    }
}));
blogRouter.put("/update-blog", userMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parseData = zod_1.updateBlog.safeParse(req.body);
    if (!parseData.success) {
        res.status(400).json({
            msg: "Validation failed buddy",
            success: false,
            error: true,
        });
        return;
    }
    try {
        const userId = req.userId;
        yield prisma.post.update({
            where: {
                id: parseData.data.id,
                authorId: userId,
            },
            data: {
                title: parseData.data.title,
                content: parseData.data.content,
            },
        });
        res.status(202).json({
            msg: "Blog Updated",
            success: true,
            error: false,
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            msg: "Internal server error",
            success: false,
            error: true,
        });
        return;
    }
}));
blogRouter.get("/bulk", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBlogs = yield prisma.post.findMany({
            include: {
                author: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        res.status(200).json({
            allBlogs,
            msg: "All blogs fetched successfully",
            success: true,
            error: false,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Internal server error",
            success: false,
            error: true,
        });
    }
}));
blogRouter.get("/:id", userMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    try {
        const blogById = yield prisma.post.findUnique({
            where: {
                id: blogId,
            },
            include: {
                author: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        if (!blogById) {
            res.status(404).json({ error: "Blog not found" });
            return;
        }
        res.status(200).json({
            blogById,
            msg: "Blog fetched",
            success: true,
            error: false,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Internal server error",
            success: false,
            error: true,
        });
        return;
    }
}));
exports.default = blogRouter;
