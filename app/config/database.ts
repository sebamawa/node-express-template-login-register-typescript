import mongoose from 'mongoose';
import config from './properties';

export default () => {
    mongoose.connect(config.DB_URL, {useNewUrlParser: true})
        .then(() => console.log(`Mongo connected on ${config.DB_URL}`))
        .catch(err => console.log(`Connection has error ${err}`))

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongo is disconnected');
            process.exit(0);
        })
    })    
};


