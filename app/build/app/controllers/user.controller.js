"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/auth/user.model");
var UserController;
(function (UserController) {
    function createUser(req, res) {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };
        user_model_1.UserModel.create(newUser, (err, user) => {
            if (err)
                console.log(err);
            res.render('auth/login');
        });
    }
    UserController.createUser = createUser;
    function loginUser(req, res) {
        const userData = {
            email: req.body.email,
            password: req.body.password
        };
        user_model_1.UserModel.findOne({ email: userData.email }, (err, user) => {
            if (err)
                console.log(err);
            if (!user) {
                // email does not exist
                res.status(409).send('Something is wrong');
            }
            else {
                // user find. Check password
                if (user.password === userData.password) {
                    res.render('auth/profile');
                }
                else {
                    // password wrong
                    res.status(409).send('Something is wrong');
                }
            }
        });
    }
    UserController.loginUser = loginUser;
})(UserController || (UserController = {}));
exports.UserController = UserController;
