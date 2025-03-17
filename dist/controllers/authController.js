"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const authService_1 = require("../services/authService");
const authMiddleware_1 = require("../middleware/authMiddleware");
const register = async (req, res) => {
    const { username, password, department, role } = req.body;
    try {
        const newUser = await (0, authService_1.registerUser)(username, password, department, role);
        const { password: _ } = newUser, userWithoutPassword = __rest(newUser, ["password"]);
        res.status(201).json({
            message: "User Registered successfully",
            user: userWithoutPassword,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                error: error.message,
            });
        }
        else {
            res.status(400).json({
                error: "internal server error",
            });
        }
    }
};
exports.register = register;
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await (0, authService_1.loginUser)(username, password);
        res.json({ token });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({
                error: "internal server error",
            });
        }
    }
};
exports.login = login;
const logout = (req, res) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(400).json({
            message: "No token provided",
        });
        return;
    }
    (0, authMiddleware_1.blacklistToken)(token);
    res.status(200).json({
        message: "Successfully logged out",
    });
};
exports.logout = logout;
