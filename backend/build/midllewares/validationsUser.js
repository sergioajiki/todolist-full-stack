"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var emailRegex_1 = __importDefault(require("./emailRegex"));
var ValidationUser = /** @class */ (function () {
    function ValidationUser() {
    }
    ValidationUser.validateCreateUserFields = function (req, res, next) {
        var _a = req.body, username = _a.username, email = _a.email, password = _a.password;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields must be filled' });
        }
        next();
    };
    ValidationUser.ValidatePasswordFormat = function (req, res, next) {
        var password = req.body.password;
        if (password.length < 6 || password.length > 12) {
            return res.status(400).json({ message: 'Password must be 6 to 12 characters' });
        }
        next();
    };
    ValidationUser.ValidateEmailFormat = function (req, res, next) {
        var email = req.body.email;
        if (!emailRegex_1.default.isValidEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        next();
    };
    return ValidationUser;
}());
exports.default = ValidationUser;
