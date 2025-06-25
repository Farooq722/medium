import express from "express";
import userRouter from "./userRouter/router";
import blogRouter from "./blogRouter/router";

const router = express.Router();

router.use("/user", userRouter);
router.use("/blog", blogRouter);

export default router;