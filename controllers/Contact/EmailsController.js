const EmailsService = require('../../services/Contact/EmailsService');
const emailsServiceInstance = new EmailsService();

// Requests to get validated and formatted data
const AddEmailRequest = require('../../requests/schema/contact/Emails/AddEmailRequest');
const PushEmailsRequest = require('../../requests/schema/contact/Emails/PushEmailsRequest');

// data transfromers
const EmailTransformer = require('../../transformers/Contact/EmailTransformer');

module.exports = {

    getEmails: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const response = await emailsServiceInstance.getEmailsByContactId( req.params.contactId );
            if(response.success) {
                const transformedData = await (new EmailTransformer()).getTransformedData(req, response.data);
                return res.success(transformedData, response.message);
            }
            return res.error(response.data, response.message);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },
    
    findEmail: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const response = await emailsServiceInstance.findEmailByContactIdAndEmailId(req.params.contactId, req.params.emailId);
            if(response.success) {
                const transformedData = await (new EmailTransformer()).getTransformedData(req, response.data);
                return res.success(transformedData, response.message);
            }

            return res.error(response.data, response.message);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },

    addNewEmail: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const AddEmailRequestInstance = new AddEmailRequest();
            const emailsData = await AddEmailRequestInstance.getData(req.body);
            const response = await emailsServiceInstance.pushEmails( req.params.contactId, emailsData );
            if(response.success) {
                return res.success({}, response.message, 200);
            }
            return res.error(response.data, response.message, 500);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },
    
    pushEmails: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const PushEmailsRequestInstance = new PushEmailsRequest();
            const emailsData = await PushEmailsRequestInstance.getData(req.body);

            const response = await emailsServiceInstance.pushEmails( req.params.contactId, emailsData );
            if(response.success) {
                return res.success({}, response.message, 200);
            }
            return res.error(response.data, response.message, 500);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },

    updateEmail: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const AddEmailRequestInstance = new AddEmailRequest();
            const emailData = await AddEmailRequestInstance.getData(req.body);

            // We only pass the body object, never the req object
            const response = await emailsServiceInstance.updateEmailByContactIdAndEmailId(req.params.contactId, req.params.emailId, emailData);
            if(response.success) {
                const transformedData = await (new EmailTransformer()).getTransformedData(req, response.data);
                return res.success(transformedData, response.message);
            }
            return res.error(response.data, response.message);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },

    deleteEmail: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const response = await emailsServiceInstance.deleteEmailByContactIdAndEmailId(req.params.contactId, req.params.emailId);
            if(response.success) {
                return res.success({}, response.message, 204);
            }

            return res.error(response.data, response.message);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },
    

}
