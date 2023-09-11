"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = __importDefault(require("../controller/user.controller"));
var userController = new user_controller_1.default();
var router = (0, express_1.Router)();
router.post('/login/register', function (req, res) { return userController.createUser(req, res); });
exports.default = router;
