const NumbersService = require('../../services/Contact/NumbersService');
const numbersServiceInstance = new NumbersService();

// Requests to get validated and formatted data
const AddNumberRequest = require('../../requests/schema/contact/Numbers/AddNumberRequest');
const PushNumbersRequest = require('../../requests/schema/contact/Numbers/PushNumbersRequest');

// data transfromers
const NumberTransformer = require('../../transformers/Contact/NumberTransformer');

module.exports = {

    getNumbers: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const response = await numbersServiceInstance.getNumbersByContactId( req.params.numberId );
            if(response.success) {
                const transformedData = await (new NumberTransformer()).getTransformedData(req, response.data);
                return res.success(transformedData, response.message);
            }
            return res.error(response.data, response.message);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },
    
    findNumber: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const response = await numbersServiceInstance.findNumberByContactIdAndNumberId(req.params.contactId, req.params.numberId);
            if(response.success) {
                const transformedData = await (new NumberTransformer()).getTransformedData(req, response.data);
                return res.success(transformedData, response.message);
            }

            return res.error(response.data, response.message);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },

    addNewNumber: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const AddNumberRequestInstance = new AddNumberRequest();
            const numbersData = await AddNumberRequestInstance.getData(req.body);
            const response = await numbersServiceInstance.pushNumbers( req.params.contactId, numbersData );
            if(response.success) {
                return res.success({}, response.message, 200);
            }
            return res.error(response.data, response.message, 500);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },
    
    pushNumbers: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const PushNumbersRequestInstance = new PushNumbersRequest();
            const numbersData = await PushNumbersRequestInstance.getData(req.body);

            const response = await numbersServiceInstance.pushNumbers( req.params.contactId, numbersData );
            if(response.success) {
                return res.success({}, response.message, 200);
            }
            return res.error(response.data, response.message, 500);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },

    updateNumber: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const AddNumberRequestInstance = new AddNumberRequest();
            const numberData = await AddNumberRequestInstance.getData(req.body);

            // We only pass the body object, never the req object
            const response = await numbersServiceInstance.updateNumberByContactIdAndNumberId(req.params.contactId, req.params.numberId, numberData);
            if(response.success) {
                const transformedData = await (new NumberTransformer()).getTransformedData(req, response.data);
                return res.success(transformedData, response.message);
            }
            return res.error(response.data, response.message);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },

    deleteNumber: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const response = await numbersServiceInstance.deleteNumberByContactIdAndNumberId(req.params.contactId, req.params.numberId);
            if(response.success) {
                return res.success({}, response.message, 204);
            }

            return res.error(response.data, response.message);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },
    

}
