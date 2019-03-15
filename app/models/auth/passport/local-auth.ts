import passport from 'passport';
import passportLocal from 'passport-local';
import { User, UserModel, UserDocument } from '../user.model';


const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user, done) => {
    done(null, user.id);
});

passport.deserializeUser<any, any>(async (id, done) => {
    const user = await UserModel.findById(id);
    done(null, user);
});

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req: any, email, password, done) => {
    //let user = await UserModel.findOne({email: email}); // bd query (asynchrone method)
                                    // si no se pone await devuelve una promesa (pero se quiere q ejecute)                                      
      
    await UserModel.findOne({email: email})
        .then(user => {
            if (!user) {
                // null para error, false para usuario (no existe usuario)
                //return done(null, false, req.flash('loginMessage', 'No user found'));
                
                return done(null, false, req.flash('loginMessage', 'No user found'));
            }
            if (user.password != password) {
                //return done(null, false, req.flash('loginMessage', 'Incorrect Password'));
                return done(null, false, req.flash('loginMessage', 'Incorrect Password'));
            }
            //req.flash('success_msg', `Bienvenido ${user.name}`);
            //console.log(req.locals);
            return done(null, user, req.flash('success_msg', `Bienvenido ${user.name}`)); // se puede agregar mj de logueo ok            
        });                                    
}));

// FUNCIONA (alternativa a passport.use() con 2 arrow functions)
/**
 * Sign in using Email and Password
 */
// passport.use('local-login', new LocalStrategy({ 
//     usernameField: "email",
//     passwordField: 'password',
//     passReqToCallback: true 
// }, async (req, email, password, done) => {
//     await UserModel.findOne({ email: email }, (err, user: any) => {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: `Email ${email} not found.` });
//       }
//       if (user.password != password) return done(null, false);
//       return done(null, user);
//     });
//   }));

export { passport };