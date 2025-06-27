import express from "express";
import { signin, signup } from "../../validation/zod";
import bcrypt, { compare } from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  /* if i destucture like this { data } then this wont prinst this  
        {
        success: true,
        data: { name: 'B Farooq', email: 'farooq@gmail.com', password: 'far123' 
        }
    }
    */
  const data = signup.safeParse(req.body);

  if (!data.success) {
    res.status(400).json({
      msg: "Validation failed buddy",
      success: false,
      error: true,
    });
    return;
  }
  const isUserExits = await prisma.user.findUnique({
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

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(data.data.password, salt);
  try {
    const newUser = await prisma.user.create({
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
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Internal server error",
      success: false,
      error: true,
    });
    return;
  }
});

userRouter.post("/signin", async (req, res) => {
  const parseData = signin.safeParse(req.body);

  if (!parseData.success) {
    res.status(400).json({
      msg: "Validation failed buddy",
      success: false,
      error: true,
    });
    return;
  }

  try {
    const isUserExits = await prisma.user.findUnique({
      where: {
        email: parseData.data.email,
      },
    });

    const checkPassword = await bcrypt.compare(
      parseData.data.password,
      isUserExits?.password!
    );
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

    const token = jwt.sign(
      {
        userId: isUserExits.id,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const cookieOption = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" as const : "lax" as const,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/"      
    };

    res.cookie("token", token, cookieOption);
    res.status(200).json({
      user: {
        id: isUserExits .id,
        name: isUserExits.name,
        email: isUserExits.email
      },
      msg: "Login successfully",
      success: true,
      error: false,
      token: token
    });
    return;
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Internal server error",
      success: false,
      error: true,
    });
    return;
  }
});

export default userRouter;
