import express, { Application } from 'express';
const session = require('express-session');
const flash = require('connect-flash');
import exphbs from 'express-handlebars';
import passport from 'passport';

import config from './app/config/properties';
import userRoutes from './app/routes/user.routes';
import DB from './app/config/database';

// class for server
class Server {
    public app: Application;

    constructor() {
        // initializations
        this.app = express();
        DB(); 

        this.config();
        this.middlewares();
        this.routes();
    }    

    config(): void {
        // view folder
        this.app.set('views', __dirname + '/app/views');
        // view engine
        this.app.engine('.hbs', exphbs({
            defaultLayout: 'main',
            layoutsDir: this.app.get('views') + '/layouts',
            partialsDir: this.app.get('views') + '/partials',
            extname: '.hbs'
        }));
        this.app.set('view engine', '.hbs'); // debe ir luego del seteo anterior
    }

    middlewares(): void {
        this.app.use(express.urlencoded({extended: false})); // indica que datos se reciben desde formulario (NO imagenes) -> NECESARIO

        this.app.use(session({
            secret: 'mysecretsession',
            resave: false,
            saveUninitialized: false
        }));
        this.app.use(flash()); // para enviar mensajes entre views
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        // global variables
        this.app.use((req: any, res, next) => {
            res.locals.success_msg = req.flash('success_msg'); // mensaje de exito en logueo y registro
            res.locals.error_msg = req.flash('error_msg'); // mensaje de error
            next();
        });

        // guardo usuario logueado si lo hay o guardo mensaje de error (se muestran en la view)
        this.app.use((req: any, res, next) => {
            this.app.locals.user = req.user;
            //this.app.registerMessage = req // TODO
            this.app.locals.loginMessage = req.flash('loginMessage');
            //console.log(req.flash('loginMessage'));
            next();
        });
    }

    routes(): void {
        // home route
        this.app.get('/', (req, res) => {
            res.render('home');
        });
        // users route
        this.app.use(userRoutes);
    }

    // init server
    start(): void {
        this.app.listen(config.PORT, () => {
            console.log(`Server running on port: ${config.PORT}`);
        });
    }
}

const server = new Server();
server.start();