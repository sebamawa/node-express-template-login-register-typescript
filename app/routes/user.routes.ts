import { Router } from 'express';
//import passport from 'passport';
import { passport } from '../../app/models/auth/passport/local-auth'; // importa con funciones agregadas en passport (serializeUser(), use(), etc)
//require('../../app/models/auth/passport/local-auth');
import { UserController } from '../controllers/user.controller';

class UserRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
         // login routes
        this.router.get('/users/login', (req, res) => {
            res.render('auth/login');
        });    
        this.router.post('/users/login', passport.authenticate('local-login', {
            successRedirect: '/users/profile',
            failureRedirect: '/users/login',
            failureFlash: true
        }));

        // profile route
        // se protege ruta con la funcion pasada en el segundo parametro (implementada al final)
        this.router.get('/users/profile', this.isAuthenticated, (req, res) => {
            res.render('auth/profile');
        });

        // register routes
        this.router.get('/users/register', (req, res) => {
            res.render('auth/register');
        });  
        this.router.post('/users/register', (req, res) => {
           UserController.createUser(req, res);
        });    
        
        // logout
        this.router.get('/users/logout', (req, res, next) => {
            req.logout(); // elimina sesion
            res.redirect('/');
        });
    } // config()

    isAuthenticated(req: any, res: any, next: any): void {
        if (req.isAuthenticated()) {
            return next(); // si usuario auntenticado continua con la siguiente ruta
        }
        res.redirect('/');
    }
}

const  userRoutes = new UserRoutes;
export default userRoutes.router;