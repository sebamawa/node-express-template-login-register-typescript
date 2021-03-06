"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//require('../../app/models/auth/passport/local-auth');
//import { UserController } from '../controllers/user.controller';
//import UserController from '../controllers/user.controller';
//const UserController = require('../controllers/user.controller.js');
const user_controller_1 = require("../controllers/user.controller");
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.userController = new user_controller_1.UserController();
        this.config();
    }
    config() {
        // WEB ROUTES
        // login routes
        this.router.get('/users/login', (req, res) => {
            res.render('auth/login');
        });
        // this.router.post('/users/login', passport.authenticate('local-login', {
        //     successRedirect: '/users/profile',
        //     failureRedirect: '/users/login',
        //     failureFlash: true
        // }));
        //this.router.post('/users/login', UserController.loginUser);
        this.router.post('/users/login', this.userController.loginUser);
        // profile route
        // se protege ruta con la funcion pasada en el segundo parametro (implementada al final)
        this.router.get('/users/profile', this.isAuthenticated, (req, res) => {
            res.render('auth/profile');
        });
        // register routes
        this.router.get('/users/register', (req, res) => {
            res.render('auth/register');
        });
        //this.router.post('/users/register', UserController.createUser);
        this.router.post('/users/register', this.userController.createUser);
        // logout
        //this.router.get('/users/logout', this.isAuthenticated, UserController.logout);
        this.router.get('/users/logout', this.isAuthenticated, this.userController.logout);
        // delete user account
        //this.router.post('/users/delete_account', this.isAuthenticated, UserController.deleteUserAccount);
        this.router.delete('/users/delete_account', this.isAuthenticated, this.userController.deleteUserAccount);
        /****************************************************************************************** */
        // API ROUTES
        this.router.get('/users_api', this.userController.getUsers);
    } // config()
    isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { // isAuthenticated() metodo agregado por passport a req
            return next(); // si usuario auntenticado continua con la siguiente ruta
        }
        res.redirect('/');
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
