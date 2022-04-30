const config = require("./config");
const mongoose = require('mongoose');
const logger = require('./util/Logger/Logger');

const mongooseOptions = {
    useNewUrlParser : true,
    useUnifiedTopology : true
};

mongoose.Promise = global.Promise;

// connect to the db and initialize the app is successfull
mongoose.connect(config.dbUrl, mongooseOptions)
    .then( () => {
        //create express instance to setup API
        const ExpressLoader = require('./loaders/Express');
        new ExpressLoader();
    }).catch( err => {
        console.error( err );
        logger.error( err );
    });