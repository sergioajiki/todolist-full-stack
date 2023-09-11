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
const user_model_1 = __importDefault(require("../model/user.model"));
const bcryptUtils_1 = __importDefault(require("../utils/bcryptUtils"));
const activationUrlBuilder_1 = __importDefault(require("../utils/activationUrlBuilder"));
const emailBullService_1 = __importDefault(require("../utils/emailBullService"));
const jwUtils_1 = __importDefault(require("../utils/jwUtils"));
class UserService {
    constructor(userModel = new user_model_1.default(), bcryptUtils = new bcryptUtils_1.default()) {
        this.userModel = userModel;
        this.bcryptUtils = bcryptUtils;
    }
    createUser(userPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            const isEmail = yield this.userModel.getUserByEmail(userPayload.email);
            if (isEmail)
                return { status: 'CONFLICT', data: { message: 'Email is already registered' } };
            const payload = {
                username: userPayload.username,
                email: userPayload.email,
                password: this.bcryptUtils.hashPassword(userPayload.password),
                activationCode: 'colocar activation code',
                status: 0,
            };
            const newUser = yield this.userModel.createUser(payload);
            const { id, username, activationCode, email } = newUser;
            const activationUrl = (0, activationUrlBuilder_1.default)({ id, activationCode });
            console.log(activationUrl);
            const responseEmail = yield emailBullService_1.default.emailQueue.add({ email, username, activationUrl });
            console.log('responsee', responseEmail);
            return {
                status: 'CREATE',
                data: { message: 'Usuário foi cadastrado! Verifique seu email para ativar sua conta' }
            };
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userById = yield this.userModel.getUserById(+id);
            if (!userById) {
                return { status: 'NOT_FOUND', data: { message: 'User not found' } };
            }
            return { status: 'SUCCESSFUL', data: userById };
        });
    }
    activateUser(id, activationCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.getUserById(+id);
            if (!user) {
                return { status: 'NOT_FOUND', data: { message: 'User not found' } };
            }
            if ((user === null || user === void 0 ? void 0 : user.status) === 1) {
                return { status: 'CONFLICT', data: { message: `User with id ${id} already activated` } };
            }
            if (user.activationCode !== activationCode) {
                return { status: 'UNAUTHORIZED', data: { message: 'Invalid Activation Code' } };
            }
            yield this.userModel.activateUser(id);
            return { status: 'CREATE', data: { message: 'Your account has been activated' } };
        });
    }
    login(loginInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = loginInfo;
            const userInfo = yield this.userModel.getUserByEmail(email);
            if (!userInfo) {
                return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
            }
            const isValidPassword = this.bcryptUtils.checkPassword(password, userInfo.password);
            if (!isValidPassword) {
                return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
            }
            if (userInfo.status === 0) {
                return { status: 'UNAUTHORIZED', data: { message: 'Verifique o email para ativar a conta' } };
            }
            const payload = { id: userInfo.id, email: userInfo.email };
            const token = jwUtils_1.default.sign(payload);
            return { status: 'SUCCESSFUL', data: { token } };
        });
    }
}
exports.default = UserService;
