"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Email {
    static isValidEmail(email) {
        return this.regex.test(email);
    }
}
exports.default = Email;
Email.regex = /\S+@\S+\.\S+/;
