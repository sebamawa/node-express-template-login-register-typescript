import {Router} from 'express';
import passport from 'passport';
//require('../../app/models/auth/passport/local-auth');
//import * from '../../app/models/auth/passport/local-auth';

class UserRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // profile route
        this.router.get('/users/profile', (req, res) => {
            res.render('auth/profile');
        }); 

        // login routes
        this.router.get('/users/login', (req, res) => {
            res.render('auth/login');
        });        
        this.router.post('/users/login', passport.authenticate('local-login', {
            successRedirect: '/users/profile',
            failureRedirect: '/users/login',
            //failureFlash: true
        }));

        // register routes
        this.router.get('/users/register', (req, res) => {
            res.render('auth/register');
        });        
    }
}

const  userRoutes = new UserRoutes;
export default userRoutes.router;