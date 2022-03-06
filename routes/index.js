const config = require('../config');
const router = require('express').Router();
const templates = require('./routes-templates');
const user = require('./user');
const authRoutes = require('./authRoute');
const authMiddleware = require('../middlewares/auth');

let routes = () => {
    router.use( (req, res, next) => {
        res.setHeader( 'Access-Control-Allow-Origin', '*' );
        res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE' );
        res.setHeader( 'Access-Control-Allow-Headers', 'X-Requested-With,content-type, x-access-token, authorization' );
        res.setHeader( 'Access-Control-Allow-Credentials', true );
        res.removeHeader( 'X-Powered-By' );
        next(); 
    });

    router.use("/auth", authRoutes);
    router.use("/user", authMiddleware.authenticate(), user);

    return router;
};


module.exports = routes;