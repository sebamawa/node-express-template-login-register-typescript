"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const properties_1 = __importDefault(require("./properties"));
exports.default = () => {
    const options = {
        //reconnectTries: 10, // Never stop trying to reconnect
        useNewUrlParser: true,
        autoReconnect: true,
    };
    const connect = function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(properties_1.default.DB_URL, options);
                console.log(`Mongo connected on: ${properties_1.default.DB_URL}`);
                // // close de Mongoose connection, when receiving SIGINT
                // process.on('SIGINT', function() {
                //     mongoose.connection.close(() => {
                //         console.log('Mongo is disconnected');
                //         process.exit(0);
                //     })
                // })                
            }
            catch (err) {
                console.log(`Connection has error: ${err}`);
            }
        });
    };
    // // mongoose.connect(config.DB_URL, options)...
    // const connect = function() {
    //     mongoose.connect(config.DB_URL, options) 
    //     .then(() => console.log(`Mongo connected on: ${config.DB_URL}`))
    //     .catch(err => { 
    //         console.log(`Connection has error: ${err}`); 
    //         //process.exit(0); // kill process if connection to the database fails on first attempt
    //     })
    //     // close de Mongoose connection, when receiving SIGINT
    //     process.on('SIGINT', function() {
    //     mongoose.connection.close(() => {
    //         console.log('Mongo is disconnected');
    //         process.exit(0);
    //     })
    //     })
    // }   
    connect();
    mongoose_1.default.connection.on('reconnectFailed', function () {
        console.log('Finalizaron 30 intentos de reconexion. Se intenta de nuevo.');
        //mongoose.connection.close();
        mongoose_1.default.disconnect();
        connect();
    });
    //    mongoose.connection.on('error', function(){
    //         mongoose.disconnect();
    //         console.log(`Error`);
    //     }); 
    //     mongoose.connection.on('disconnected', function(){
    //         console.log('MongoDB disconnected!');
    //         connect();
    //     });    
    // mongoose.connection.on('connected', function(){
    //     isConnectedBefore = true;
    //     console.log('Connection established to MongoDB');
    // }); 
    // mongoose.connection.on('disconnected', function(){
    //     console.log('Se perdio conexion a la BD');
    //     if (!isConnectedBefore)
    //         connect();
    // });    
    // si se desconecta a la BD intenta conectarse a los 20000 ms
    // si se llega a los 30 intentos de reconexion al hacer un request post
    // donde se use algun metodo de modelo (create, findone, etc) sigue intentando reconectar 
    // sin matar el proceso de node
    // mongoose.connection.on('disconnected', function(){
    //     console.log('Se perdio conexion a la BD');
    //     setTimeout(() => {
    //         connect();
    //     }, 20000);
    // }); 
    // mongoose.connection.on('reconnected', function(){
    //     console.log('Conexion re-establecida a la BD'); 
    // });  
    // mongoose.connection.on('error', function(err){
    //     if (err.name === 'MongoNetworkError') {
    //         connect();
    //     }
    // });
};
