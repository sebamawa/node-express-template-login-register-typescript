"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = {
    name: 'Sebastian',
    email: 'sebamawa@hotmail.com',
    password: 'euclides1996'
};
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => __awaiter(this, void 0, void 0, function* () {
    const user = yield UserModel;
    done(null, user);
}));
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => __awaiter(this, void 0, void 0, function* () {
    const user = yield UserModel; // bd query (asynchrone method)
    // si no se pone await devuelve una promesa (pero se quiere q ejecute)
    console.log('ACA ESTOY');
    if (!user) {
        //* debug
        console.log('No se encontro usuario');
        // null para error, false para usuario (no existe usuario)
        return done(null, false, req.flash('loginMessage', 'No user found'));
    }
    //* debug
    console.log('email de usuario encontrado');
    if (user.password != password) {
        return done(null, false, req.flash('loginMessage', 'Incorrect Password'));
    }
    console.log('ACA ESTOY en local-auth.js (linea 30)');
    return done(null, user); // se puede agregar mj de logueo ok
})));
