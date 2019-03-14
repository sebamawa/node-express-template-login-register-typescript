"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Define modelo (y esquema en mongodb) de datos para la coleccion Users
 */
const mongoose = __importStar(require("mongoose"));
// import * as bcrypt from 'bcryptjs'; // no funciona 
const bcrypt = require('bcryptjs');
//import { Document, Schema, Model, model} from "mongoose";
//import {User} from './User';
// // interface IUser extends mongoose.Document {
//  export interface IUser extends Document {
//     name: string;
//     email: string;
//     password: string
//  };
//const UserSchema = new Schema({ 
const UserSchema = new mongoose.Schema({
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
// agrega metodos al esquema
// Otra forma: UserSchema.methods.nombreMetodo = ...
UserSchema.statics = {
    create: function (userData, cb) {
        const user = new this(userData);
        user.save(cb);
    },
    login: function (query, cb) {
        this.find(query, cb);
    },
    // encripta password del usuario
    encryptPassword: function (password) {
        const salt = bcrypt.genSalt(10); // aplica algoritmo 10 veces (para generar hash)
        const hash = bcrypt.hash(password, salt);
        return hash;
    },
    // compara passwords del modelo de datos contra la del usuario
    matchPassword: function (password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt.compare(password, this.password);
        });
    }
};
//const UserModel = mongoose.model<User>('User', UserSchema); // funciona
//const UserModel = model('User', UserSchema);
const UserModel = mongoose.model('User', UserSchema); // funciona
exports.UserModel = UserModel;
