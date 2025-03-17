"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const express_validator_1 = require("express-validator");
const validationRequest_1 = require("../middleware/validationRequest");
const router = express_1.default.Router();
router.post("/register", (0, express_validator_1.body)("username").notEmpty().withMessage("Username is required"), (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"), (0, express_validator_1.body)("department").notEmpty().withMessage("Department is required"), (0, express_validator_1.body)("role")
    .isIn(["USER", "ADMIN", "SUPER"])
    .withMessage("Role must be one of 'USER', 'ADMIN', or 'SUPER'"), validationRequest_1.handleValidation, authController_1.register);
router.post("/login", (0, express_validator_1.body)("username").notEmpty().withMessage("username required"), (0, express_validator_1.body)("password").notEmpty().withMessage("password required"), validationRequest_1.handleValidation, authController_1.login);
exports.default = router;
