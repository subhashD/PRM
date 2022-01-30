const config = require('../config');
const router = require('express').Router();
const templates = require('./routes-templates');
const user = require('./user');

let routes = () => {
    router.use( (req, res, next) => {
        res.setHeader( 'Access-Control-Allow-Origin', '*' );
        res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE' );
        res.setHeader( 'Access-Control-Allow-Headers', 'X-Requested-With,content-type, x-access-token, authorization' );
        res.setHeader( 'Access-Control-Allow-Credentials', true );
        res.removeHeader( 'X-Powered-By' );
        next(); 
    });

    router.use("/", templates);
    router.use("/user", user);

    return router;
};


module.exports = routes;