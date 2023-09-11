"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = __importDefault(require("../controller/user.controller"));
var validationsUser_1 = __importDefault(require("../midllewares/validationsUser"));
var userController = new user_controller_1.default();
var router = (0, express_1.Router)();
router.post('/login/register', validationsUser_1.default.validateCreateUserFields, validationsUser_1.default.ValidateEmailFormat, validationsUser_1.default.ValidatePasswordFormat, function (req, res) { return userController.createUser(req, res); });
router.get('/users/:id', function (req, res) { return userController.getUserById(req, res); });
exports.default = router;
