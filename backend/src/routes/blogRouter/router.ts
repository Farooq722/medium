import express from "express";
import userMiddleware from "../../middleware/userMiddleware";
import { createBlog, updateBlog } from "../../validation/zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const blogRouter = express.Router();

blogRouter.post("/create-blog", userMiddleware, async (req, res) => {
  const parseData = createBlog.safeParse(req.body);

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
    const blog = await prisma.post.create({
      data: {
        title: parseData.data.title,
        content: parseData.data.content,
        author: {
          connect: { id: userId! },
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
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      success: false,
      error: true,
    });
    return;
  }
});

blogRouter.put("/update-blog", userMiddleware, async (req, res) => {
  const parseData = updateBlog.safeParse(req.body);
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
    await prisma.post.update({
      where: {
        id: parseData.data.id,
        authorId: userId!,
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
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      success: false,
      error: true,
    });
    return;
  }
});

blogRouter.get("/bulk", async (req, res) => {
  try {
    const allBlogs = await prisma.post.findMany({
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
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      success: false,
      error: true,
    });
  }
});

blogRouter.get("/:id", userMiddleware, async (req, res) => {
  const blogId = req.params.id;
  try {
    const blogById = await prisma.post.findUnique({
      where: {
        id: blogId,
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
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      success: false,
      error: true,
    });
    return;
  }
});

export default blogRouter;
