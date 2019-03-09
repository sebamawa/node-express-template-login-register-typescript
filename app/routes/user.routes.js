"use strict";
exports.__esModule = true;
var express_1 = require("express");
var passport_1 = require("passport");
require('../../app/models/auth/passport/local-auth');
//import * from '../../app/models/auth/passport/local-auth';
var UserRoutes = /** @class */ (function () {
    function UserRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    UserRoutes.prototype.config = function () {
        // profile route
        this.router.get('/users/profile', function (req, res) {
            res.render('auth/profile');
        });
        // login routes
        this.router.get('/users/login', function (req, res) {
            res.render('auth/login');
        });
        this.router.post('/users/login', passport_1["default"].authenticate('local-login', {
            successRedirect: '/users/profile',
            failureRedirect: '/users/login'
        }));
        // register routes
        this.router.get('/users/register', function (req, res) {
            res.render('auth/register');
        });
    };
    return UserRoutes;
}());
var userRoutes = new UserRoutes;
exports["default"] = userRoutes.router;
