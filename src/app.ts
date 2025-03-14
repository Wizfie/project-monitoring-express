import express from "express";
import morgan from "morgan";
import apiRouter from "./routes/apiRoutes";

const app = express();

// Middleware untuk parsing JSON body dari request
app.use(express.json());
// Middleware untuk mencatat log HTTP request
app.use(morgan("dev"));
app.use("/api", apiRouter);

// Export aplikasi untuk digunakan di server.ts
export default app;
