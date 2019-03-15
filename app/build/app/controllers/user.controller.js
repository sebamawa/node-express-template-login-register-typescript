"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/auth/user.model");
var UserController;
(function (UserController) {
    function createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let newUser = new user_model_1.User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            // encripta password
            newUser.password = yield newUser.encryptPassword(newUser.password);
            console.log(newUser.password);
            // inserta usuario
            user_model_1.UserModel.create(newUser, (err, user) => {
                if (err)
                    console.log(err);
                res.render('auth/login');
            });
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
