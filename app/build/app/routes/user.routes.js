"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
require('../../app/models/auth/passport/local-auth');
//import * from '../../app/models/auth/passport/local-auth';
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        // profile route
        this.router.get('/users/profile', (req, res) => {
            res.render('auth/profile');
        });
        // login routes
        this.router.get('/users/login', (req, res) => {
            res.render('auth/login');
        });
        this.router.post('/users/login', passport_1.default.authenticate('local-login', {
            successRedirect: '/users/profile',
            failureRedirect: '/users/login',
        }));
        // register routes
        this.router.get('/users/register', (req, res) => {
            res.render('auth/register');
        });
    }
}
const userRoutes = new UserRoutes;
exports.default = userRoutes.router;
