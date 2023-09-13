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
const bull_1 = __importDefault(require("bull"));
const nodemailerUtils_1 = __importDefault(require("./nodemailerUtils"));
const emailQueue = new bull_1.default('emailNotifications', {
    redis: {
        host: 'redis',
        port: 6379,
        maxRetriesPerRequest: 5,
    },
});
emailQueue.process((job, done) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = job;
    console.log('2', data);
    yield nodemailerUtils_1.default.sendEmail(data);
    done();
    done(new Error('error email not sent'));
}));
exports.default = {
    emailQueue,
};
