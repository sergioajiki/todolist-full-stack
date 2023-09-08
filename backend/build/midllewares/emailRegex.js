"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Email = /** @class */ (function () {
    function Email() {
    }
    Email.isValidEmail = function (email) {
        return this.regex.test(email);
    };
    Email.regex = /\S+@\S+\.\S+/;
    return Email;
}());
exports.default = Email;
