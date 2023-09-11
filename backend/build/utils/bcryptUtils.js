"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var BcryptUtils = /** @class */ (function () {
    function BcryptUtils() {
        this.hashPassword = function (password) { return bcrypt_1.default.hashSync(password, 10); };
        this.checkPassword = function (password, hassPassword) {
            return bcrypt_1.default.compareSync(password, hassPassword);
        };
    }
    return BcryptUtils;
}());
exports.default = BcryptUtils;
