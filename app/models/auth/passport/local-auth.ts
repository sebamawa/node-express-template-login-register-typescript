const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UserModel = {
    name: 'Sebastian',
    email: 'sebamawa@hotmail.com',
    password: 'euclides1996'
}

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    const user = await UserModel;
    done(null, user);
});

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await UserModel; // bd query (asynchrone method)
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
}));