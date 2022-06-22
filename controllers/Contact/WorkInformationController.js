const WorkInformationService = require('../../services/Contact/WorkInformationService');
const workInformationServiceInstance = new WorkInformationService();

// Requests to get validated and formatted data
const WorkInformationRequest = require('../../requests/schema/contact/WorkInformationRequest');

// data transfromers
const WorkInformationTransformer = require('../../transformers/Contact/WorkInformationTransformer');

module.exports = {

    get: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const response = await workInformationServiceInstance.getByContactId( req.params.contactId );
            if(response.success) {
                console.log(response.data);
                const transformedData = await (new WorkInformationTransformer()).getTransformedData(req, response.data);
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
            const workInformationRequestInstance = new WorkInformationRequest();
            const informationData = await workInformationRequestInstance.getData(req.body);

            // We only pass the body object, never the req object
            const response = await workInformationServiceInstance.updateByContactId(req.params.contactId, informationData);
            if(response.success) {
                const transformedData = await (new WorkInformationTransformer()).getTransformedData(req, response.data);
                return res.success(transformedData, response.message);
            }
            return res.error(response.data, response.message);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },

    delete: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const response = await workInformationServiceInstance.deleteByContactId(req.params.contactId);
            if(response.success) {
                return res.success({}, response.message, 200);
            }

            return res.error(response.data, response.message);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },    

}
