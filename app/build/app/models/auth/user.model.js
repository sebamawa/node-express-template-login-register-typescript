"use strict";
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
//const UserModel = mongoose.model<User>('User', UserSchema); // funciona
//const UserModel = model('User', UserSchema);
const UserModel = mongoose.model('User', UserSchema); // funciona
exports.UserModel = UserModel;
