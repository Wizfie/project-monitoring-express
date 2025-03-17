"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blacklistToken = exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("../types/express"); // Import the custom type definitions
const JWT_SECRET = process.env.JWT_SECRET || "secret_key";
const blacklist = new Map();
// Middleware untuk autentikasi JWT
const authenticateJWT = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(403).json({ error: "Token is required" });
        return;
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, user) => {
        if (err || !user) {
            return res.status(403).json({ error: "Token is not valid" });
        }
        req.user = user; // Menambahkan informasi user ke objek request
        return next(); // Pastikan next() dipanggil dengan return
    });
};
exports.authenticateJWT = authenticateJWT;
// Fungsi untuk menambahkan token ke daftar hitam (blacklist)
const blacklistToken = (token) => {
    blacklist.set(token, Date.now());
};
exports.blacklistToken = blacklistToken;
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
