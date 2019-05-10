import mongoose, { ConnectionOptions } from 'mongoose';
import config from './properties';

export default () => {
    const options: ConnectionOptions = {
        //reconnectTries: 10, // Never stop trying to reconnect
        useNewUrlParser: true
        //bufferMaxEntries: 0   
        // server: {
        //     reconnectTries: Number.MAX_VALUE,
        //     reconnectInterval: 1000
        // }               
    };

    const connect = async function() { // connect() retorna una promesa
        try {
            await mongoose.connect(config.DB_URL, options);
            console.log(`Mongo connected on: ${config.DB_URL}`);
            
            // // close de Mongoose connection, when receiving SIGINT
            // process.on('SIGINT', function() {
            //     mongoose.connection.close(() => {
            //         console.log('Mongo is disconnected');
            //         process.exit(0);
            //     })
            // })                
        } catch(err) {
            console.log(`Connection has error: ${err}`); 
        }         
    }

    // // mongoose.connect(config.DB_URL, options)...
    // const connect = function() {
    //     mongoose.connect(config.DB_URL, options) 
    //     .then(() => console.log(`Mongo connected on: ${config.DB_URL}`))
    //     .catch(err => { 
    //         console.log(`Connection has error: ${err}`); 
    //         //process.exit(0); // kill process if connection to the database fails on first attempt
    //     })
          
    //     // close de Mongoose connection, when receiving SIGINT
    //     process.on('SIGINT', function() {
    //     mongoose.connection.close(() => {
    //         console.log('Mongo is disconnected');
    //         process.exit(0);
    //     })
    //     })
    // }   

    connect();

    mongoose.connection.on('reconnectFailed', function(){
        console.log('Finalizaron 30 intentos de reconexion. Se intenta de nuevo.');
        //mongoose.connection.close();
        connect();
    });      

//    mongoose.connection.on('error', function(){
//         console.log(`Error`);
//     });    

    // mongoose.connection.on('connected', function(){
    //     isConnectedBefore = true;
    //     console.log('Connection established to MongoDB');
    // }); 
    // mongoose.connection.on('disconnected', function(){
    //     console.log('Se perdio conexion a la BD');
    //     if (!isConnectedBefore)
    //         connect();
    // });    

    // si se desconecta a la BD intenta conectarse a los 20000 ms
    // si se llega a los 30 intentos de reconexion al hacer un request post
    // donde se use algun metodo de modelo (create, findone, etc) sigue intentando reconectar 
    // sin matar el proceso de node
    // mongoose.connection.on('disconnected', function(){
    //     console.log('Se perdio conexion a la BD');
    //     setTimeout(() => {
    //         connect();
    //     }, 20000);
    // }); 
    // mongoose.connection.on('reconnected', function(){
    //     console.log('Conexion re-establecida a la BD'); 
    // });  
    // mongoose.connection.on('error', function(err){
    //     if (err.name === 'MongoNetworkError') {
    //         connect();
    //     }
    // });
};


