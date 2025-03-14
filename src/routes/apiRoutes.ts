import Express from "express";
import authRoutes from "./authRoutes";

const router = Express.Router();

router.use("/auth", authRoutes);

export default router;
