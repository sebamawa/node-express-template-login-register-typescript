import { passport } from '../../app/models/auth/passport/local-auth'; 
import { UserModel } from '../models/auth/user.model';

//namespace UserController {

    //export async function createUser(req: any, res: any) { // (req: Response, res: Response) {
    module.exports.createUser = async (req: any, res: any, next: any) => {
        let newUser = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        // encripta password
        try {
            newUser.password = await newUser.encryptPassword(newUser.password);
        } catch (err) {
            console.log(`Error en la encriptacion del password: ${err}`);
            return res.send('Hubo un error. Intente el registro nuevamente');
        }    

        // inserta usuario usando model de mongoose
        await UserModel.create(newUser, function(err: Error) { // create es una funcion del model mongoose
            if (err) {
                console.log(err);
                return res.send('Hubo un error en el registro'); // si no se usa return mata el proceso de node
            }    

            //res.render('auth/login');

            // login luego de registro (se usa metodo login() agreagado por passport a req)
            req.login(newUser, function(err: Error){
                if (err) {
                    console.log(err);
                    return res.send('Hubo un error en el login');//next(err); 
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
    }

    exports.logout = (req: any, res: any) => {
        req.logout(); // elimina sesion (metodo agregado por passport)
        res.redirect('/');
    }

    //export function loginUser(req: any, res: any) {
    module.exports.loginUser = (req: any,res: any,next: any) => { // CORREGIR
        // Usando passport
        // console.log('Login user');
        passport.authenticate('local-login', 
        {
            successRedirect: '/users/profile',
            failureRedirect: '/users/login',
            failureFlash: true
        }
        )(req, res, next) // passport.authenticate() retorna una funcion   
    }
    
    module.exports.deleteUserAccount = async (req: any, res: any) => { 
        // con try-catch
        try {
            await UserModel.deleteOne({_id: req.user._id});
        } catch (err) {
            console.log('Hubo un error en el borrado de la cuenta de usuario');
            res.flash('error_msg', `No se pudo eliminar la cuenta del usuario - ${req.user.name} -`);
            req.logout();
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
    }

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