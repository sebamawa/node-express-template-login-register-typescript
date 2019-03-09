import passport from 'passport';
//import {LocalStrategy} from 'passport-local';
const LocalStrategy = require('passport-local').Strategy;
import userModel from '../user.model';

passport.serializeUser((user, done) => {
    // console.log(user);
    // user.id es salvada en la sesion y luego es recuperado en deserealizeUser()
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
});

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
//}, async (req, email, password, done) => {
}, async (req, email, password, done) => {    
    const user = await userModel.findOne({email: email}); // bd query (asynchrone method)
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
}));