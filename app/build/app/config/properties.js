"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    PORT: process.env.PORT || 3000,
    DB_URL: 'mongodb://localhost:27017/db-template-mvc-express'
};
exports.default = config;
