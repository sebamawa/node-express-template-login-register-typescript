/**
 * Define modelo (y esquema en mongodb) de datos para la coleccion Users
 */
import * as mongoose from 'mongoose';
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
},{
    timestamps: true // guarda en la coleccion la fecha de creacion y actualizacion
});

// agrega metodos al esquema
UserSchema.statics = {
    create: function(userData: any, cb: any) {
        const user: any = new this(userData);
        user.save(cb);
    },
    login: function(query: any, cb: any) {
        this.find(query, cb);
    }
}

//const UserModel = mongoose.model<User>('User', UserSchema); // funciona
//const UserModel = model('User', UserSchema);
const UserModel = mongoose.model('User', UserSchema); // funciona
export {UserModel};




