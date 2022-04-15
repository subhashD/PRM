const config = require('../config');
const router = require('express').Router();
const templates = require('./routes-templates');
const authMiddleware = require('../middlewares/auth');
const addUserDataMiddleware = require('../middlewares/addUserData');
const user = require('./user');
const authRoutes = require('./authRoute');
const contactRoutes = require('./contactRoute');
const genderRoutes = require('./genderRoute');

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
    router.use("/user", [authMiddleware.authenticate(), addUserDataMiddleware], user);
    router.use("/contact", [authMiddleware.authenticate(), addUserDataMiddleware], contactRoutes);
    router.use("/gender", [authMiddleware.authenticate(), addUserDataMiddleware], genderRoutes);

    return router;
};


module.exports = routes;