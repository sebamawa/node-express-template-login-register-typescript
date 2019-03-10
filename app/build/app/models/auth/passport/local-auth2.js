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
const passport_local_1 = __importDefault(require("passport-local"));
const user_model_1 = require("../user.model");
const LocalStrategy = passport_local_1.default.Strategy;
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.serializeUser((id, done) => __awaiter(this, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findById(id);
    done(null, user);
}));
/**
 * Sign in using Email and Password
 */
passport_1.default.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => __awaiter(this, void 0, void 0, function* () {
    //const user = await UserModel.findOne({email: email}); // bd query (asynchrone method)
    // si no se pone await devuelve una promesa (pero se quiere q ejecute)
    user_model_1.UserModel.findOne({ email: email }), (err, user) => {
        if (err)
            return done(err);
        if (!user) {
            // null para error, false para usuario (no existe usuario)
            //return done(null, false, req.flash('loginMessage', 'No user found'));
            return done(null, false);
        }
        //* debug
        //console.log('email de usuario encontrado');
        if (user.password != password) {
            //return done(null, false, req.flash('loginMessage', 'Incorrect Password'));
            return done(null, false);
        }
        //console.log('ACA ESTOY en local-auth.js (linea 30)');
        return done(null, user); // se puede agregar mj de logueo ok
    };
})));
