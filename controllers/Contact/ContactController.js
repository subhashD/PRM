const ContactService = require('../../services/Contact/ContactService');
const ContactServiceInstance = new ContactService();

// Requests to get validated and formatted data
const CreateContactRequest = require('../../requests/schema/contact/CreateContactRequest');
const UpdateContactRequest = require('../../requests/schema/contact/UpdateContactRequest');

// data transfromers
const ContactTransformer = require('../../transformers/Contact/ContactTransformer');

module.exports = {

    create: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const createContactRequestInstance = new CreateContactRequest();
            const contactData = await createContactRequestInstance.getData(req.body);
            const response = await ContactServiceInstance.create(contactData);
            if(response.success) {
                return res.success({}, response.message, 201);
            }
            return res.error(response.data, response.message, 500);
        } catch ( err ) {
            res.error( err, err.name, 500);
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
            res.error( err, err.name, 500);
        }
    },

    get: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const response = await ContactServiceInstance.getById( req.params.contactId );
            console.log(response);
            if(response.success) {
                const transformedData = await (new ContactTransformer()).getTransformedData(req, response.data);
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
            const updateContactRequestInstance = new UpdateContactRequest();
            const contactData = await updateContactRequestInstance.getData(req.body);
            const response = await ContactServiceInstance.update(req.params.contactId, contactData);
            if(response.success) {
                return res.success({}, response.message, 200);
            }
            return res.error(response.data, response.message, 500);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },
    
    delete: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const response = await ContactServiceInstance.deleteById( req.params.contactId );
            if(response.success) {
                return res.success({}, response.message, 204);
            }

            return res.error(response.data, response.message);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },

}
