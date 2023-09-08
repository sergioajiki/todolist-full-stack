"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var buildActivationUrl = function (payload) {
    return process.env.HOST + ":" + process.env.APP_PORT + "/activate/" + payload.id + "/" + payload.activationCode;
};
exports.default = buildActivationUrl;
