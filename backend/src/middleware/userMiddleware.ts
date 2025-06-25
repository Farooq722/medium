import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

// Add this in a global typings file (e.g., express.d.ts) or uncomment and move it properly:
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.path === "/bulk") {
    return next(); // skip auth for /bulk
  }
  try {
    const token = req.signedCookies?.token ?? req.cookies?.token;

    if (!token) {
      res.status(401).json({ msg: "Token missing" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId?: string;
    };

    if (!decoded.userId) {
      res.status(401).json({ msg: "Unauthorized request" });
      return;
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
    return;
  }
};

export default userMiddleware;
