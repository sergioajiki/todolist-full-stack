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
const mapStatusHTTP_1 = __importDefault(require("../utils/mapStatusHTTP"));
const user_service_1 = __importDefault(require("../service/user.service"));
class UserController {
    constructor(userService = new user_service_1.default()) {
        this.userService = userService;
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = req.body;
            const response = yield this.userService.createUser(payload);
            return res.status((0, mapStatusHTTP_1.default)(response.status)).json(response.data);
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const userById = yield this.userService.getUserById(+id);
            return res.status((0, mapStatusHTTP_1.default)(userById.status)).json(userById.data);
        });
    }
}
exports.default = UserController;
