import { UserModel } from '../models/auth/user.model';

namespace UserController {

    export async function createUser(req: any, res: any) { // (req: Response, res: Response) {
        let newUser = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        // encripta password
        newUser.password = await newUser.encryptPassword(newUser.password);
        //console.log(newUser.password);
        // inserta usuario
        UserModel.create(newUser, (err: any, user: any) => { // create es ima funcion del model
            if (err) {
                console.log(err);
                res.send('Hubo un error en el registro');
            }    

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