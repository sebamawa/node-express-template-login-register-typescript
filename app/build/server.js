"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const session = require('express-session');
const flash = require('connect-flash');
//import flash from 'connect-flash';
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const passport_1 = __importDefault(require("passport"));
const properties_1 = __importDefault(require("./app/config/properties"));
const user_routes_1 = __importDefault(require("./app/routes/user.routes"));
const database_1 = __importDefault(require("./app/config/database"));
// class for server
class Server {
    constructor() {
        // initializations
        this.app = express_1.default();
        database_1.default();
        this.config();
        this.middlewares();
        this.routes();
    }
    config() {
        // view folder
        this.app.set('views', __dirname + '/app/views');
        // view engine
        this.app.engine('.hbs', express_handlebars_1.default({
            defaultLayout: 'main',
            layoutsDir: this.app.get('views') + '/layouts',
            partialsDir: this.app.get('views') + '/partials',
            extname: '.hbs'
        }));
        this.app.set('view engine', '.hbs'); // debe ir luego del seteo anterior
    }
    middlewares() {
        this.app.use(express_1.default.urlencoded({ extended: false })); // indica que datos se reciben desde formulario (NO imagenes) -> config necesaria
        this.app.use(session({
            secret: 'mysecretsession',
            resave: false,
            saveUninitialized: false
        }));
        this.app.use(flash()); // para enviar mensajes entre views
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
        // global variables
        this.app.use((req, res, next) => {
            res.locals.success_msg = req.flash('success_msg'); // mensaje de exito en logueo y registro
            res.locals.error_msg = req.flash('error_msg'); // mensaje de error
            next();
        });
        // guardo usuario logueado si lo hay o guardo mensaje de error (se muestran en la view)
        this.app.use((req, res, next) => {
            this.app.locals.user = req.user;
            //this.app.registerMessage = req // TODO
            this.app.locals.loginMessage = req.flash('loginMessage');
            //console.log(req.flash('loginMessage'));
            next();
        });
    }
    routes() {
        // home route
        this.app.get('/', (req, res) => {
            res.render('home');
        });
        // users route
        this.app.use(user_routes_1.default);
    }
    // init server
    start() {
        this.app.listen(properties_1.default.PORT, () => {
            console.log(`Server running on port: ${properties_1.default.PORT}`);
        });
    }
}
const server = new Server();
server.start();
