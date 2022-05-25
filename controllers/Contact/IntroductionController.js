const IntroductionService = require('../../services/Contact/IntroductionService');
const introductionServiceInstance = new IntroductionService();

// Requests to get validated and formatted data
const IntroductionRequest = require('../../requests/schema/contact/IntroductionRequest');

// data transfromers
const IntroductionTransformer = require('../../transformers/Contact/IntroductionTransformer');

module.exports = {

    getIntroduction: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const response = await introductionServiceInstance.getIntroductionByContactId( req.params.contactId );
            if(response.success) {
                const transformedData = await (new IntroductionTransformer()).getTransformedData(req, response.data);
                return res.success(transformedData, response.message);
            }
            return res.error(response.data, response.message);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },
    
    updateIntroduction: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const introductionRequestInstance = new IntroductionRequest();
            const introductionData = await introductionRequestInstance.getData(req.body);

            // We only pass the body object, never the req object
            const response = await introductionServiceInstance.updateIntroductionByContactId(req.params.contactId, introductionData);
            if(response.success) {
                const transformedData = await (new IntroductionTransformer()).getTransformedData(req, response.data);
                return res.success(transformedData, response.message);
            }
            return res.error(response.data, response.message);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },

    deleteIntroduction: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const response = await introductionServiceInstance.deleteIntroductionByContactId(req.params.contactId, req.params.emailId);
            if(response.success) {
                return res.success({}, response.message, 200);
            }

            return res.error(response.data, response.message);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },    

}
