"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const db_1 = __importDefault(require("../config/db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const JWT_SECRET = process.env.JWT_SECRET || "secret_key";
const registerUser = async (username, password, department, role) => {
    if (!Object.values(client_1.Role).includes(role)) {
        throw new Error("invalid role");
    }
    const hashPassword = await bcryptjs_1.default.hash(password, 10);
    const newUser = await db_1.default.user.create({
        data: {
            username,
            password: hashPassword,
            department,
            role: role,
            active: true,
        },
    });
    return newUser;
};
exports.registerUser = registerUser;
const loginUser = async (username, password) => {
    const user = await db_1.default.user.findFirst({
        where: {
            username,
        },
    });
    if (!user) {
        throw new Error("user not found");
    }
    const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("invalid credential");
    }
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        username: user.username,
        role: user.role,
    }, JWT_SECRET, {
        expiresIn: "4h",
    });
    return token;
};
exports.loginUser = loginUser;
