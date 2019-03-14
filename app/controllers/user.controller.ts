import { UserModel } from '../models/auth/user.model';

namespace UserController {

    export function createUser(req: any, res: any) { // (req: Response, res: Response) {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        newUser.password = UserModel.encryptPassword(newUser.password, ()=>{});

        // encripta password
        //newUser
        UserModel.create(newUser, (err: any, user: any) => { // create es funcion definida en el model (user.model.ts)
            if (err) console.log(err);

            res.render('auth/login');
        });
    }

    export function loginUser(req: any, res: any) {
        const userData = {
            email: req.body.email,
            password: req.body.password
        }

        UserModel.findOne({email: userData.email}, (err, user: any) => {
            if (err) console.log(err);

            if (!user) {
                // email does not exist
                res.status(409).send('Something is wrong');
            } else {
                // user find. Check password
                if (user.password === userData.password) {
                    res.render('auth/profile');
                } else {
                    // password wrong
                    res.status(409).send('Something is wrong');
                }
            }
        });
    }
}   

export { UserController };