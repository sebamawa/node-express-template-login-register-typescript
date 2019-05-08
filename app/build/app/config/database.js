"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const properties_1 = __importDefault(require("./properties"));
exports.default = () => {
    const options = {
        // reconnectTries: Number.MAX_VALUE // Never stop trying to reconnect
        useNewUrlParser: true,
        keepAliveInitialDelay: 300000
    };
    // mongoose.connect(config.DB_URL, options)...
    const connect = function () {
        mongoose_1.default.connect(properties_1.default.DB_URL, options)
            .then(() => console.log(`Mongo connected on: ${properties_1.default.DB_URL}`))
            .catch(err => {
            console.log(`Connection has error: ${err}`);
            //process.exit(0); // kill process if connection to the database fails on first attempt
        });
        // close de Mongoose connection, when receiving SIGINT
        process.on('SIGINT', () => {
            mongoose_1.default.connection.close(() => {
                console.log('Mongo is disconnected');
                process.exit(0);
            });
        });
    };
    connect();
    // si se desconecta a la BD intenta conectarse a los 20000 ms
    // si se llega a los 30 intentos de reconexion al hacer un request post
    // donde se use algun metodo de modelo (create, findone, etc) sigue intentando reconectar 
    // sin matar el proceso de node
    mongoose_1.default.connection.on('disconnected', function () {
        console.log('Se perdio conexion a la BD');
        setTimeout(() => {
            connect();
        }, 20000);
    });
    mongoose_1.default.connection.on('reconnected', function () {
        console.log('Conexion re-establecida a la BD');
    });
};
