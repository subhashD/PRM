const FoodService = require('../../services/Contact/FoodService');
const foodServiceInstance = new FoodService();

// Requests to get validated and formatted data
const FoodRequest = require('../../requests/schema/contact/FoodRequest');

// data transfromers
const FoodTransformer = require('../../transformers/Contact/FoodTransformer');

module.exports = {

    get: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const response = await foodServiceInstance.getByContactId( req.params.contactId );
            if(response.success) {
                const transformedData = await (new FoodTransformer()).getTransformedData(req, response.data);
                return res.success(transformedData, response.message);
            }
            return res.error(response.data, response.message);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },
    
    update: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const foodRequestInstance = new FoodRequest();
            const informationData = await foodRequestInstance.getData(req.body);

            // We only pass the body object, never the req object
            const response = await foodServiceInstance.updateByContactId(req.params.contactId, informationData);
            if(response.success) {
                const transformedData = await (new FoodTransformer()).getTransformedData(req, response.data);
                return res.success(transformedData, response.message);
            }
            return res.error(response.data, response.message);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },   

}
