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
const sequelize_1 = require("sequelize");
exports.default = {
    up(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            return queryInterface.createTable('users', {
                id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                username: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                password: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                activationCode: {
                    type: sequelize_1.DataTypes.STRING,
                    field: 'activation_code',
                    allowNull: false,
                },
                status: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                }
            });
        });
    },
    down(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            return queryInterface.dropTable('users');
        });
    }
};
