"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Define modelo (y esquema en mongodb) de datos para la coleccion Users
 */
//import * as mongoose from 'mongoose';
const mongoose_1 = require("mongoose");
// import * as bcrypt from 'bcryptjs'; // no funciona 
const bcrypt = require('bcryptjs');
// 2) SCHEMA
const UserSchema = new mongoose_1.Schema({
    //const UserSchema = new mongoose.Schema({
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
// register each method at schema
//UserSchema.method('encryptPassword', User.prototype.encryptPassword);
//UserSchema.method('matchPassword', User.prototype.matchPassword);
// Instance methods
UserSchema.methods.encryptPassword = (password) => __awaiter(this, void 0, void 0, function* () {
    const salt = yield bcrypt.genSalt(10);
    const hash = yield bcrypt.hash(password, salt);
    return hash;
});
UserSchema.methods.matchPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.compare(password, this.password);
        // let matchPasswords: boolean = await bcrypt.compare(password, this.password);
        // console.log(matchPasswords);
        // return matchPasswords;
    });
};
// 3) Model
exports.UserModel = mongoose_1.model('User', UserSchema);
