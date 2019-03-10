import passport from 'passport';
import passportLocal from 'passport-local';
import { UserModel } from '../user.model';
//import { User } from '../User';

//import { Request, Response } from 'express';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user, done) => {
    done(null, user.id);
});

passport.serializeUser<any, any>(async (id, done) => {
    const user = await UserModel.findById(id);
    done(null, user);
});

/**
 * Sign in using Email and Password
 */
passport.use('local-login', new LocalStrategy({ 
    usernameField: "email",
    passwordField: 'password',
    passReqToCallback: true }, async (req, email, password, done) => {
    await UserModel.findOne({ email: email }, (err, user: any) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: `Email ${email} not found.` });
      }
      if (user.password != password) return done(null, false);
      return done(null, user);
    });
  }));