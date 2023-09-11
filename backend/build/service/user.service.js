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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_model_1 = __importDefault(require("../model/user.model"));
var bcryptUtils_1 = __importDefault(require("../utils/bcryptUtils"));
var activationUrlBuilder_1 = __importDefault(require("../utils/activationUrlBuilder"));
var emailBullService_1 = __importDefault(require("../utils/emailBullService"));
var jwUtils_1 = __importDefault(require("../utils/jwUtils"));
var UserService = /** @class */ (function () {
    function UserService(userModel, bcryptUtils) {
        if (userModel === void 0) { userModel = new user_model_1.default(); }
        if (bcryptUtils === void 0) { bcryptUtils = new bcryptUtils_1.default(); }
        this.userModel = userModel;
        this.bcryptUtils = bcryptUtils;
    }
    UserService.prototype.createUser = function (userPayload) {
        return __awaiter(this, void 0, void 0, function () {
            var isEmail, payload, newUser, id, username, activationCode, email, activationUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.getUserByEmail(userPayload.email)];
                    case 1:
                        isEmail = _a.sent();
                        console.log('depois do get');
                        if (isEmail)
                            return [2 /*return*/, { status: 'CONFLICT', data: { message: 'Email is already registered' } }];
                        console.log('is email', isEmail);
                        payload = {
                            username: userPayload.username,
                            email: userPayload.email,
                            password: this.bcryptUtils.hashPassword(userPayload.password),
                            activationCode: 'colocar activation code',
                            status: 0,
                        };
                        console.log('payload', payload);
                        return [4 /*yield*/, this.userModel.createUser(payload)];
                    case 2:
                        newUser = _a.sent();
                        console.log('aqui o newUser', newUser);
                        id = newUser.id, username = newUser.username, activationCode = newUser.activationCode, email = newUser.email;
                        activationUrl = (0, activationUrlBuilder_1.default)({ id: id, activationCode: activationCode });
                        return [4 /*yield*/, emailBullService_1.default.emailQueue.add({ email: email, username: username, activationUrl: activationUrl })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                status: 'CREATE',
                                data: { message: 'Usuário foi cadastrado! Verifique seu email para ativar sua conta' }
                            }];
                }
            });
        });
    };
    UserService.prototype.getUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var userById;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.getUserById(+id)];
                    case 1:
                        userById = _a.sent();
                        if (!userById) {
                            return [2 /*return*/, { status: 'NOT_FOUND', data: { message: 'User not found' } }];
                        }
                        return [2 /*return*/, { status: 'SUCCESSFUL', data: userById }];
                }
            });
        });
    };
    UserService.prototype.activateUser = function (id, activationCode) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.getUserById(+id)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, { status: 'NOT_FOUND', data: { message: 'User not found' } }];
                        }
                        if ((user === null || user === void 0 ? void 0 : user.status) === 1) {
                            return [2 /*return*/, { status: 'CONFLICT', data: { message: "User with id " + id + " already activated" } }];
                        }
                        if (user.activationCode !== activationCode) {
                            return [2 /*return*/, { status: 'UNAUTHORIZED', data: { message: 'Invalid Activation Code' } }];
                        }
                        return [4 /*yield*/, this.userModel.activateUser(id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { status: 'CREATE', data: { message: 'Your account has been activated' } }];
                }
            });
        });
    };
    UserService.prototype.login = function (loginInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, userInfo, isValidPassword, payload, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = loginInfo.email, password = loginInfo.password;
                        return [4 /*yield*/, this.userModel.getUserByEmail(email)];
                    case 1:
                        userInfo = _a.sent();
                        if (!userInfo) {
                            return [2 /*return*/, { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } }];
                        }
                        isValidPassword = this.bcryptUtils.checkPassword(password, userInfo.password);
                        if (!isValidPassword) {
                            return [2 /*return*/, { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } }];
                        }
                        if (userInfo.status === 0) {
                            return [2 /*return*/, { status: 'UNAUTHORIZED', data: { message: 'Verifique o email para ativar a conta' } }];
                        }
                        payload = { id: userInfo.id, email: userInfo.email };
                        token = jwUtils_1.default.sign(payload);
                        return [2 /*return*/, { status: 'SUCCESSFUL', data: { token: token } }];
                }
            });
        });
    };
    return UserService;
}());
exports.default = UserService;
