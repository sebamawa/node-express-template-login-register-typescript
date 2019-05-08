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
const local_auth_1 = require("../../app/models/auth/passport/local-auth");
const user_model_1 = require("../models/auth/user.model");
//namespace UserController {
//export async function createUser(req: any, res: any) { // (req: Response, res: Response) {
module.exports.createUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let newUser = new user_model_1.UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    // encripta password
    try {
        newUser.password = yield newUser.encryptPassword(newUser.password);
    }
    catch (err) {
        console.log(`Error en la encriptacion del password: ${err}`);
        return res.send('Hubo un error. Intente el registro nuevamente');
    }
    // inserta usuario usando model de mongoose
    yield user_model_1.UserModel.create(newUser, function (err) {
        if (err) {
            console.log(err);
            return res.send('Hubo un error en el registro'); // si no se usa return mata el proceso de node
        }
        //res.render('auth/login');
        // login luego de registro (se usa metodo login() agreagado por passport a req)
        req.login(newUser, function (err) {
            if (err) {
                console.log(err);
                return res.send('Hubo un error en el login'); //next(err); 
            }
            req.flash('success_msg', `Bienvenido ${newUser.name}`);
            return res.redirect('/users/profile');
        });
    });
    // await newUser.save((err) => { // usando metodo save() en lugar de UserModel.create()
    //     console.log(err);
    // });
    // // res.render('auth/login');
    // req.login(newUser, function(err:any) {
    //     if (err) {
    //         console.log(err);
    //         res.send(`Hubo un error: ${err}`);
    //     }
    // });
    // return res.redirect('/');
});
exports.logout = (req, res) => {
    req.logout(); // elimina sesion (metodo agregado por passport)
    res.redirect('/');
};
//export function loginUser(req: any, res: any) {
module.exports.loginUser = (req, res, next) => {
    // Usando passport
    // console.log('Login user');
    local_auth_1.passport.authenticate('local-login', {
        successRedirect: '/users/profile',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next); // passport.authenticate() retorna una funcion   
};
module.exports.deleteUserAccount = (req, res) => __awaiter(this, void 0, void 0, function* () {
    // con try-catch
    console.log('Metodo delete');
    try {
        yield user_model_1.UserModel.deleteOne({ _id: req.user._id });
    }
    catch (err) {
        console.log('Hubo un error en el borrado de la cuenta de usuario');
        res.flash('error_msg', `No se pudo eliminar la cuenta del usuario - ${req.user.name} -`);
        //req.logout();
        res.redirect('/');
    }
    // // con callback
    // await UserModel.deleteOne({_id: req.user._id}, function(err) {
    //     if (err) {
    //         console.log('Hubo un error al intentar borrar la cuenta');
    //         res.flash('error_msg', `No se pudo eliminar la cuenta del usuario - ${req.user.name} -`);
    //         req.logout();
    //         res.redirect('/');
    //     }
    //     req.flash('success_msg', `Se elimino la cuenta del usuario - ${req.user.name} - correctamente.`);
    //     req.logout();
    //     console.log('Cuenta borrada correctamente');
    //     res.redirect('/');
    // });
});
// Login sin usar passport    
//     const userData = {
//         email: req.body.email,
//         password: req.body.password
//     }
//     UserModel.findOne({email: userData.email}, (err, user: any) => {
//         if (err) console.log(err);
//         if (!user) {
//             // email does not exist
//             res.status(409).send('Something is wrong');
//         } else {
//             // user find. Check password
//             if (user.password === userData.password) {
//                 res.render('auth/profile');
//             } else {
//                 // password wrong
//                 res.status(409).send('Something is wrong');
//             }
//         }
//     });
// }
//}  
//export { UserController };
