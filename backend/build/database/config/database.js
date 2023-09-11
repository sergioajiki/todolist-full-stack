"use strict";
const sequelizeConnectionsConfig = {
    database: process.env.DB_NAME || 'task_list_app',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
};
module.exports = sequelizeConnectionsConfig;
