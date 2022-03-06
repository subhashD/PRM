const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();

login = async (req, res) => {
    const loggedInUser = await AuthServiceInstance.login( req.body );
    return res.send( loggedInUser );
}

register = async ( req, res ) => {
    try {
        // We only pass the body object, never the req object
        const createdUser = await AuthServiceInstance.create( req.body );
        return res.send( createdUser );
    } catch ( err ) {
        res.status( 500 ).send( err );
    }
}

tokenRefresh = async ( req, res ) => {
    try {
        // We only pass the body object, never the req object
        const tokenRefreshed = await AuthServiceInstance.tokenRefresh( req.body );
        return res.send( tokenRefreshed );
    } catch ( err ) {
        res.status( 500 ).send( err );
    }
}

module.exports = {login, register, tokenRefresh};
