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
        newUser.password = await newUser.encryptPassword(newUser.password);

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
    module.exports.loginUser = (req:any,res:any,next:any) => { // CORREGIR
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
        
        // , (err:any, user, info) => {
        //     if (err) next(err);
        //     if (!user) {
        //         return res.status(400).send('Email o contraseña no validos');
        //     } 
        //     req.login(user, (err: any) => {
        //         next(err);
        //         // res.send('Login exitoso');
        //     });
        // })(req, res, next); // passport.authenticate() retorna una funcion que se invoca (para que opere passport)


    // Sin usar passport    
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