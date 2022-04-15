const ContactService = require('../services/ContactService');
const ContactServiceInstance = new ContactService();

create = async ( req, res ) => {
    try {
        // We only pass the body object, never the req object
        const response = await ContactServiceInstance.create( req.body );
        return res.status( 201 ).send( response );
    } catch ( err ) {
        res.status( 500 ).send( err );
    }
}


module.exports = {create};
