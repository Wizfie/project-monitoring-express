import Express from "express";
import { login, register } from "../controllers/authController";
import { body } from "express-validator";
import { handleValidation } from "../middleware/validationRequest";

const router = Express.Router();
router.post(
  "/register",
  body("username").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
  body("department").notEmpty().withMessage("Department is required"),
  body("role")
    .isIn(["USER", "ADMIN", "SUPER"])
    .withMessage("Role must be one of 'USER', 'ADMIN', or 'SUPER'"),
  handleValidation,
  register
);
router.post(
  "/login",
  body("username").notEmpty().withMessage("username required"),
  body("password").notEmpty().withMessage("password required"),
  handleValidation,
  login
);

export default router;
