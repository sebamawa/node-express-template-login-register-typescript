import passport from 'passport';
import passportLocal from 'passport-local';
import { UserModel} from '../user.model';

 const LocalStrategy = passportLocal.Strategy;
// import { LocalStrategy } from 'passport-local';

passport.serializeUser<any, any>((user, done) => { // done es un callback para indicar cuando termina la serializacion
    done(null, user.id); // null porque no hay error
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
        let user: any = await UserModel.findOne({email: email});
      
        let matchPass: boolean = await user.matchPassword(password);
        //const matchPass: boolean = (await UserModel.findOne({email: email}).matchPassword(password);
        if (!matchPass) {
            return done(null, false, req.flash('loginMessage', 'Incorrect Password'));
        }
        if (!user) {            
            return done(null, false, req.flash('loginMessage', `Not exists a user with email: ${email}`)); // false porque no se logro autentificacion
        }      
        return done(null, user, req.flash('success_msg', `Bienvenido ${user.name}`)); // se puede agregar mj de logueo ok           
    } catch (err) {
        console.log(err);
        return done(null, false, req.flash('error_msg', 'An error ocurred in the login'));
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