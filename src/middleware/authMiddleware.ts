import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
const JWT_SECRET = process.env.JWT_SECRET || "secret_key";
const blacklist = new Map<string, number>();

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
// Middleware untuk autentikasi JWT
export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(403).json({ error: "Token is required" });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err || !user) {
      return res.status(403).json({ error: "Token is not valid" });
    }

    req.user = user;
    return next();
  });
};
// Fungsi untuk menambahkan token ke daftar hitam (blacklist)
export const blacklistToken = (token: string) => {
  blacklist.set(token, Date.now());
};

const cleanupInterval = 4 * 60 * 60 * 1000; // 4 jam
setInterval(() => {
  const now = Date.now();
  blacklist.forEach((timestamp, token) => {
    if (now - timestamp > cleanupInterval) {
      blacklist.delete(token);
    }
  });
  console.log(`Blacklist dibersihkan pada ${new Date()}`);
}, cleanupInterval);
