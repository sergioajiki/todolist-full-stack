"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelizeUsers_1 = __importDefault(require("../database/model/sequelizeUsers"));
class UserModel {
    constructor() {
        this.model = sequelizeUsers_1.default;
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.model.findOne({
                where: { email }
            });
            return !user ? null : user;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.model.findByPk(id, {
                attributes: { exclude: ['password'] }
            });
            return !user ? null : user;
        });
    }
    createUser(userPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield this.model.create(userPayload);
            return newUser;
        });
    }
    updateUserById(id, userPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            const [updatedUser] = yield this.model.update(userPayload, {
                where: { id },
            });
            return updatedUser;
        });
    }
    activateUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [updatedUser] = yield this.model.update({ status: 1 }, {
                where: { id },
            });
            return updatedUser;
        });
    }
}
exports.default = UserModel;
