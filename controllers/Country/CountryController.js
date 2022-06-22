const CountryService = require('../../services/Country/CountryService');
const CountryServiceInstance = new CountryService();
const CountryTransformer = require('../../transformers/Country/CountryTransformer');

module.exports = {

    all: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const response = await CountryServiceInstance.getAll( req.body );
            if(response.success) {
                const transformedData = await (new CountryTransformer()).getTransformedData(req, response.data);
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
            const response = await CountryServiceInstance.getById( req.params.id );
            if(response.success) {
                const transformedData = await (new CountryTransformer()).getTransformedData(req, response.data);
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
            const response = await CountryServiceInstance.seedData();
            return res.status( 200 ).send( response );
        } catch ( err ) {
            res.status( 500 ).send( err );
        }
    }

}
