"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
class BcryptUtils {
    constructor() {
        this.hashPassword = (password) => bcrypt_1.default.hashSync(password, 10);
        this.checkPassword = (password, hassPassword) => bcrypt_1.default.compareSync(password, hassPassword);
    }
}
exports.default = BcryptUtils;
