const ContactService = require('../services/ContactService');
const ContactServiceInstance = new ContactService();
const ContactTransformer = require('../transformers/Contact/ContactTransformer');

module.exports = {

    create: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const response = await ContactServiceInstance.create( req.body );
            if(response.success) {
                return res.success({}, response.message, 201);
            }
            return res.error(response.data, response.message, 500);
        } catch ( err ) {
            res.status( 500 ).send( err );
        }
    },

    all: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const response = await ContactServiceInstance.getAll( req.body );
            if(response.success) {
                const transformedData = await (new ContactTransformer()).getTransformedData(req, response.data);
                return res.success(transformedData, response.message);
            }
            return res.error(response.data, response.message);
        } catch ( err ) {
            const data = {};
            data.errors = err.message;
            res.error( data, err.name, 500);
        }
    },

    get: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const response = await ContactServiceInstance.getById( req.params.contactId );
            if(response.success) {
                const transformedData = await (new ContactTransformer()).getTransformedData(req, response.data);
                return res.success(transformedData, response.message);
            }
            return res.error(response.data, response.message);
        } catch ( err ) {
            const data = {};
            data.errors = err.message;
            res.error( data, err.name, 500);
        }
    },

}
