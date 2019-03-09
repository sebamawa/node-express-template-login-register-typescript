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
const passport_1 = __importDefault(require("passport"));
//import {LocalStrategy} from 'passport-local';
const LocalStrategy = require('passport-local').Strategy;
const user_model_1 = __importDefault(require("../user.model"));
passport_1.default.serializeUser((user, done) => {
    // console.log(user);
    // user.id es salvada en la sesion y luego es recuperado en deserealizeUser()
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(this, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id);
    done(null, user);
}));
passport_1.default.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    //}, async (req, email, password, done) => {
}, (req, email, password, done) => __awaiter(this, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: email }); // bd query (asynchrone method)
    // si no se pone await devuelve una promesa (pero se quiere q ejecute)
    console.log(email);
    return done(null, null);
    // if (!user) {
    //     //* debug
    //     console.log('No se encontro usuario');
    //     // null para error, false para usuario (no existe usuario)
    //     return done(null, false, req.flash('loginMessage', 'No user found'));
    // }
    // //* debug
    // console.log(`Email de usuario encontrado. Usuario: ${user}`);
    // if (user.password != password) {
    //     return done(null, false, req.flash('loginMessage', 'Incorrect Password'));
    // }
    // console.log('ACA ESTOY en local-auth.js (linea 41)');
    // return done(null, user); // se puede agregar mj de logueo ok
})));
