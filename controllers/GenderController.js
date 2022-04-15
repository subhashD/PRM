const GenderService = require('../services/GenderService');
const GenderServiceInstance = new GenderService();

all = async ( req, res ) => {
    try {
        // We only pass the body object, never the req object
        const response = await GenderServiceInstance.getAll( req.body );
        return res.status( 200 ).send( response );
    } catch ( err ) {
        res.status( 500 ).send( err );
    }
}

get = async ( req, res ) => {
    try {
        // We only pass the body object, never the req object
        const response = await GenderServiceInstance.getById( req.params.id );
        return res.status( 200 ).send( response );
    } catch ( err ) {
        res.status( 500 ).send( err );
    }
}

seedData = async ( req, res ) => {
    try {
        // We only pass the body object, never the req object
        const response = await GenderServiceInstance.seedData();
        return res.status( 200 ).send( response );
    } catch ( err ) {
        console.log(err);
        res.status( 500 ).send( err );
    }
}


module.exports = {all, get, seedData};
