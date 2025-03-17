"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const apiRoutes_1 = __importDefault(require("./routes/apiRoutes"));
const app = (0, express_1.default)();
// Middleware untuk parsing JSON body dari request
app.use(express_1.default.json());
// Middleware untuk mencatat log HTTP request
app.use((0, morgan_1.default)("dev"));
app.use("/api", apiRoutes_1.default);
// Export aplikasi untuk digunakan di server.ts
exports.default = app;
