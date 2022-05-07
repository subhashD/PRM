const ContactService = require('../services/ContactService');
const ContactServiceInstance = new ContactService();
const CreateContactRequest = require('../requests/schema/contact/CreateContactRequest');
const UpdateContactRequest = require('../requests/schema/contact/UpdateContactRequest');
const ContactTransformer = require('../transformers/Contact/ContactTransformer');
const EmailTransformer = require('../transformers/Contact/EmailTransformer');
const NumberTransformer = require('../transformers/Contact/NumberTransformer');

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
                return res.success({}, response.message, 200);
            }

            let statusCode = 500;
            if(App.lodash.isNull(response.data)) {
                statusCode = 404;
            }

            return res.error(response.data, response.message, statusCode);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },

    getEmails: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const response = await ContactServiceInstance.getEmailsByContactId( req.params.contactId );
            if(response.success) {
                const transformedData = await (new EmailTransformer()).getTransformedData(req, response.data);
                return res.success(transformedData, response.message);
            }
            return res.error(response.data, response.message);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },
    
    getNumbers: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const response = await ContactServiceInstance.getNumbersByContactId( req.params.contactId );
            if(response.success) {
                const transformedData = await (new NumberTransformer()).getTransformedData(req, response.data);
                return res.success(transformedData, response.message);
            }
            return res.error(response.data, response.message);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },
    
    pushEmails: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            // PersonModel.update(
            //     { _id: person._id }, 
            //     { $push: { friends: friend } },
            //     done
            // );
            const response = await ContactServiceInstance.getById( req.params.contactId );
            if(response.success) {
                const emails = response.data.emails;
                const transformedData = await (new EmailTransformer()).getTransformedData(req, emails);
                return res.success(transformedData, response.message);
            }
            return res.error(response.data, response.message);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },

}
