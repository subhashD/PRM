const GenderService = require('../services/GenderService');
const GenderServiceInstance = new GenderService();
const GenderTransformer = require('../transformers/Gender/GenderTransformer');

module.exports = {

    all: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const response = await GenderServiceInstance.getAll( req.body );
            if(response.success) {
                const transformedData = await (new GenderTransformer()).getTransformedData(req, response.data);
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
            const response = await GenderServiceInstance.getById( req.params.id );
            if(response.success) {
                const transformedData = await (new GenderTransformer()).getTransformedData(req, response.data);
                return res.success(transformedData, response.message);
            }
            return res.error(response.data, response.message);
        } catch ( err ) {
            const data = {};
            data.errors = err.message;
            res.error( data, err.name, 500);
        }
    },

    seedData: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const response = await GenderServiceInstance.seedData();
            return res.status( 200 ).send( response );
        } catch ( err ) {
            console.log(err);
            res.status( 500 ).send( err );
        }
    }

}
