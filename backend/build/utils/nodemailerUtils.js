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
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
const transport = nodemailer_1.default.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP
    },
});
const ADMINEMAIL = 'adminEmail@teste.com';
const sendEmail = ({ email, username, activationUrl }) => __awaiter(void 0, void 0, void 0, function* () {
    const emailInfo = {
        from: ADMINEMAIL,
        to: email,
        subject: 'email de teste',
        html: `<h1>Bem-vindo ${username}, clique no link para ativar o cadastro</h1><br>
      <h4>
      <a href="${activationUrl}" title="link para ativação">
      <h4>Clique aqui para ativação da conta</h4>
      </a>
      </h4>`
    };
    const emailSent = yield transport.sendMail(emailInfo);
    console.log('email foi enviado para', emailSent.accepted[0]);
});
exports.default = {
    sendEmail,
};
