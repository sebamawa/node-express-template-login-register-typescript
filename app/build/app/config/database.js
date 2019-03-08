"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const properties_1 = __importDefault(require("./properties"));
exports.default = () => {
    mongoose_1.default.connect(properties_1.default.DB_URL, { useNewUrlParser: true })
        .then(() => console.log(`Mongo connected on ${properties_1.default.DB_URL}`))
        .catch(err => console.log(`Connection has error ${err}`));
    process.on('SIGINT', () => {
        mongoose_1.default.connection.close(() => {
            console.log('Mongo is disconnected');
            process.exit(0);
        });
    });
};
