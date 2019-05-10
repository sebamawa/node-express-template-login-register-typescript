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
exports.passport = passport_1.default;
const passport_local_1 = __importDefault(require("passport-local"));
const user_model_1 = require("../user.model");
const LocalStrategy = passport_local_1.default.Strategy;
// import { LocalStrategy } from 'passport-local';
passport_1.default.serializeUser((user, done) => {
    done(null, user.id); // null porque no hay error
});
passport_1.default.deserializeUser((id, done) => __awaiter(this, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findById(id);
    done(null, user);
}));
passport_1.default.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => __awaiter(this, void 0, void 0, function* () {
    // si no se pone await devuelve una promesa (pero se quiere q ejecute)
    // con callback
    // let user = await UserModel.findOne({email: email}, function(err){
    //     if (err) {
    //         console.log(err);
    //          return done(null, false, req.flash('error_msg', 'Error when connecting to the database'));
    //     }    
    // }); // bd query (asynchrone method)
    // con try-catch
    try {
        let user = yield user_model_1.UserModel.findOne({ email: email });
        //console.log(user);
        // no se encontro usuario para el email
        if (!user) {
            return done(null, false, req.flash('loginMessage', `Not exists a user with email: ${email}`)); // false porque no se logro autentificacion        
        }
        // verifico password
        console.log(typeof (user.matchPassword(password)));
        let matchPass = yield user.matchPassword(password);
        if (!matchPass) {
            return done(null, false, req.flash('loginMessage', 'Incorrect Password'));
        }
        // credenciales de usuario ok
        return done(null, user, req.flash('success_msg', `Bienvenido ${user.name}`)); // se puede agregar mj de logueo ok           
    }
    catch (err) {
        //console.log(err);
        return done(null, false, req.flash('error_msg', `Error: ${err.name}`));
    }
    // if (!user) {
    //     // null para error, false para usuario (no existe usuario)
    //     //return done(null, false, req.flash('loginMessage', 'No user found'));
    //     return done(null, false, req.flash('loginMessage', `Not exists a user with email: ${email}`)); // false porque no se logro autentificacion
    // }
    // let matchPass: boolean = await user.matchPassword(password);
    // if (!matchPass) {
    //     return done(null, false, req.flash('loginMessage', 'Incorrect Password'));
    // }
    // //req.flash('success_msg', `Bienvenido ${user.name}`);
    // return done(null, user, req.flash('success_msg', `Bienvenido ${user.name}`)); // se puede agregar mj de logueo ok            
    // con promesa
    // await UserModel.findOne({email: email})
    //     .then(user => {
    //         if (!user) {
    //             // null para error, false para usuario (no existe usuario)
    //             //return done(null, false, req.flash('loginMessage', 'No user found'));
    //             return done(null, false, req.flash('loginMessage', 'No user found'));
    //         }
    //         if (user.password != password) {
    //             //return done(null, false, req.flash('loginMessage', 'Incorrect Password'));
    //             return done(null, false, req.flash('loginMessage', 'Incorrect Password'));
    //         }
    //         //req.flash('success_msg', `Bienvenido ${user.name}`);
    //         return done(null, user, req.flash('success_msg', `Bienvenido ${user.name}`)); // se puede agregar mj de logueo ok            
    //     });                                    
})));
