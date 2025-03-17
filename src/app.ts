import express from "express";
import morgan from "morgan";
import apiRouter from "./routes/apiRoutes";
import helmet from "helmet";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

app.use("/api", apiRouter);

export default app;
