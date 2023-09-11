"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emailRegex_1 = __importDefault(require("./emailRegex"));
class ValidationUser {
    static validateCreateUserFields(req, res, next) {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields must be filled' });
        }
        next();
    }
    static ValidatePasswordFormat(req, res, next) {
        const { password } = req.body;
        if (password.length < 6 || password.length > 12) {
            return res.status(400).json({ message: 'Password must be 6 to 12 characters' });
        }
        next();
    }
    static ValidateEmailFormat(req, res, next) {
        const { email } = req.body;
        if (!emailRegex_1.default.isValidEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        next();
    }
}
exports.default = ValidationUser;
