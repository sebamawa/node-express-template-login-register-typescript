"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import passport from 'passport';
const local_auth_1 = require("../../app/models/auth/passport/local-auth"); // importa con funciones agregadas en passport (serializeUser(), use(), etc)
//require('../../app/models/auth/passport/local-auth');
const user_controller_1 = require("../controllers/user.controller");
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        // login routes
        this.router.get('/users/login', (req, res) => {
            res.render('auth/login');
        });
        this.router.post('/users/login', local_auth_1.passport.authenticate('local-login', {
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
            user_controller_1.UserController.createUser(req, res);
        });
        // logout
        this.router.get('/users/logout', (req, res, next) => {
            req.logout(); // elimina sesion
            res.redirect('/');
        });
    } // config()
    isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next(); // si usuario auntenticado continua con la siguiente ruta
        }
        res.redirect('/');
    }
}
const userRoutes = new UserRoutes;
exports.default = userRoutes.router;
