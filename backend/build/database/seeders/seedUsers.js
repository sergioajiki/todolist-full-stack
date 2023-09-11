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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    up: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkInsert('users', [
            {
                username: 'Sergio',
                email: 'teste@teste.com',
                password: '123456',
                activation_code: 'colocar o codigo para ativar',
                status: 1,
            },
            {
                username: 'UserOne',
                email: 'userOne@teste.com',
                password: '654321',
                activation_code: 'colocar o codigo para ativar',
                status: 1,
            },
            {
                username: 'UserTwo',
                email: 'userTwo@teste.com',
                password: 'qwerty',
                activation_code: 'colocar o codigo para ativar',
                status: 1,
            },
        ], {});
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkDelete('users', {});
    }),
};
