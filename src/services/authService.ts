import prisma from "../config/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export const registerUser = async (
  username: string,
  password: string,
  department: string,
  role: string
) => {
  if (!Object.values(Role).includes(role as Role)) {
    throw new Error("invalid role");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      username,
      password: hashPassword,
      department,
      role: role as Role,
      active: true,
    },
  });
  return newUser;
};

export const loginUser = async (username: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (!user) {
    throw new Error("user not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("invalid credential");
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "4h",
    }
  );

  return token;
};
