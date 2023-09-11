"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const validationsUser_1 = __importDefault(require("../midllewares/validationsUser"));
const userController = new user_controller_1.default();
const router = (0, express_1.Router)();
router.post('/login/register', validationsUser_1.default.validateCreateUserFields, validationsUser_1.default.ValidateEmailFormat, validationsUser_1.default.ValidatePasswordFormat, (req, res) => userController.createUser(req, res));
router.get('/users/:id', (req, res) => userController.getUserById(req, res));
exports.default = router;
