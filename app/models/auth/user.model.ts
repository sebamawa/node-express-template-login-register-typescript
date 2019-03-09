/**
 * Define modelo (y esquema en mongodb) de datos para la coleccion Users
 */

import mongoose from 'mongoose';
const { Schema } = mongoose;

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
},{
    timestamps: true // guarda en la coleccion la fecha de creacion y actualizacion
});

// agrega metodos a esquema
userSchema.statics = {

    create: function(userData: any, cb: any) {
        const user = new this(userData); 
        user.save(cb);
    },

    login: function(query: any, cb: any) {
        this.find(query, cb);
    }
}

const userModel = mongoose.model('User', userSchema); // crea tabla Users
console.log('BASE DE DATOS CREADA');

export default userModel;