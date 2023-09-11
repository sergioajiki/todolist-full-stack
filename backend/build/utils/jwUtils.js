"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
var JwtUtils = /** @class */ (function () {
    function JwtUtils() {
    }
    JwtUtils.sign = function (payload) {
        return jsonwebtoken_1.default.sign(payload, this.jwtSecret, this.jwtOptions);
    };
    JwtUtils.verify = function (token) {
        var decodedToken = jsonwebtoken_1.default.verify(token, this.jwtSecret);
        return decodedToken;
    };
    JwtUtils.jwtSecret = process.env.JWT_SECRET;
    JwtUtils.jwtOptions = { expiresIn: '30m' };
    return JwtUtils;
}());
exports.default = JwtUtils;
