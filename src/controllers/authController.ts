import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/authService";
import { blacklistToken } from "../middleware/authMiddleware";

export const register = async (req: Request, res: Response) => {
  const { username, password, department, role } = req.body;
  try {
    const newUser = await registerUser(username, password, department, role);
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      message: "User Registered successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        error: error.message,
      });
    } else {
      res.status(400).json({
        error: "internal server error",
      });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const token = await loginUser(username, password);
    res.json({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({
        error: "internal server error",
      });
    }
  }
};

export const logout = (req: Request, res: Response) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    res.status(400).json({
      message: "No token provided",
    });
    return;
  }

  blacklistToken(token);
  res.status(200).json({
    message: "Successfully logged out",
  });
};
