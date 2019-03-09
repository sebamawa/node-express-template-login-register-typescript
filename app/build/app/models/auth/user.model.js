"use strict";
/**
 * Define modelo (y esquema en mongodb) de datos para la coleccion Users
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true // quita espacios en blanco
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true // no se pueden registrar 2 emails iguales
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true // guarda en la coleccion la fecha de creacion y actualizacion
});
// agrega metodos a esquema
userSchema.statics = {
    create: function (userData, cb) {
        const user = new this(userData);
        user.save(cb);
    },
    login: function (query, cb) {
        this.find(query, cb);
    }
};
const userModel = mongoose_1.default.model('User', userSchema); // crea tabla Users
console.log('BASE DE DATOS CREADA');
exports.default = userModel;
