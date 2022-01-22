const config = require('../config');

let routes = ( app ) => {
    app.use( (req, res, next) => {
        res.setHeader( 'Access-Control-Allow-Origin', '*' );
        res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE' );
        res.setHeader( 'Access-Control-Allow-Headers', 'X-Requested-With,content-type, x-access-token' );
        res.setHeader( 'Access-Control-Allow-Credentials', true );
        res.removeHeader( 'X-Powered-By' );
        next(); 
    })

    
    if ( config.env === 'development') {
        //won't enforce https
    } else {
        //will enforce https
    }
};

// Redirect to https route equivalent
function secureRequest( req, res, next ) {
    if( req.headers['x-forwaded-proto'] === 'https' ) {
        return next();
    }

    res.redirect( 'https://' + req.headers.host + '/' + req.path);
}

module.exports = routes;