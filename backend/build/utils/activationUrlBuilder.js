"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const buildActivationUrl = (payload) => `${process.env.HOST}:${process.env.APP_PORT}/activate/${payload.id}/${payload.activationCode}`;
exports.default = buildActivationUrl;
