/**
 * Define modelo (y esquema en mongodb) de datos para la coleccion Users
 */
//import * as mongoose from 'mongoose';
import { Document, Schema, model } from 'mongoose';
// import * as bcrypt from 'bcryptjs'; // no funciona 
const bcrypt = require('bcryptjs');

// 1) INTERFACE
export interface User {
    name: string;
    email: string;
    password: string;
}

// 2) SCHEMA
const UserSchema = new Schema({ 
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
},{
    timestamps: true // guarda en la coleccion la fecha de creacion y actualizacion
});

// register each method at schema
//UserSchema.method('encryptPassword', User.prototype.encryptPassword);
//UserSchema.method('matchPassword', User.prototype.matchPassword);

// Instance methods
UserSchema.methods.encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;    
    //throw(new Error('Hubo un error en la encriptacion'));
}

UserSchema.methods.matchPassword = async function(password: string) {
    return bcrypt.compare(password, this.password); // devuelve promesa
}

// 2) Document
export interface UserDocument extends User, Document{ 
    encryptPassword(password: string): string;
    matchPassword(password: string): boolean;
}

// 3) Model
export const UserModel = model<UserDocument>('User', UserSchema);




