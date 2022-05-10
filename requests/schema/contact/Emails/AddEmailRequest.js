var ObjectId = require('mongoose').Types.ObjectId;
const ContactRepository = require( "../../../../repositories/ContactRepository" ); // Contact Repo Layer

class AddEmailRequest {

    constructor (withContact = false) {
        // if withContact = true : no need to check for unique rule
        this.withContact = withContact;
    }

    getRules = (isUpdate = false) => {
        

        let emailRule = {
            isEmail: true,
            errorMessage: "Email field should be a valid Email id.",
        };
        
        let typeRule = {
            isString: true,
            errorMessage: "Type field should be a string.",
            matches: {
                options: [/\b(?:Personal|Office|Business|Home|Temporary)\b/],
                errorMessage: "Invalid Type! It should be any one of the 'Personal|Office|Business|Home|Temporary'"
            },
        };

        if(this.withContact) { // goes inside if rules called from contact
            // add more conditions for email field 
            emailRule.notEmpty = true;
            
            // add more conditions for type field 
            typeRule.notEmpty = true;

        } else {
            let emailUniqueValidator = null;
            if(isUpdate) {
                // add more conditions for email field 
                emailRule.optional = true;
                
                // add more conditions for type field 
                typeRule.optional = true;

                emailUniqueValidator = async (email, { req }) => {
                    if(req.params.contactId && req.params.emailId){
                        const contactRepositoryInstance = new ContactRepository();
                        let queryProjection = {
                            emails: {
                                $elemMatch: {
                                    email: email,
                                },
                            },
                        };

                        const result = await contactRepositoryInstance.findOne( {
                            '_id': req.params.contactId, 
                            'emails.email': email
                        }, queryProjection );

                        if(!App.lodash.isEmpty(result) && !App.lodash.isEmpty(result.emails)) {
                            if(result.emails[0]._id != req.params.emailId) {
                                throw Error('Email already exists!');
                            }
                            return true;
                        }
                        return true;
                    }
                
                    throw Error('Not a valid request!');
                }
            } else {
                // add more conditions for email field 
                emailRule.notEmpty = true;
                
                // add more conditions for type field 
                typeRule.notEmpty = true;

                emailUniqueValidator = async (email, { req }) => {
                    if(req.params.contactId){
                        let queryProjection = {
                            emails: {
                                $elemMatch: {
                                    email: email,
                                },
                            },
                        };

                        const contactRepositoryInstance = new ContactRepository();
                        const result = await contactRepositoryInstance.findOne( {
                            '_id': req.params.contactId, 
                            'emails.email': email
                        }, queryProjection );
                        if(!App.lodash.isEmpty(result) && !App.lodash.isEmpty(result.emails)) {
                            throw Error('Email already exists!');
                        }
                        return true;
                    }
                
                    throw Error('Not a valid request!');
                }
            }
            // add custom unique validator
            emailRule.custom = {
                options: emailUniqueValidator
            };
        }

        const createEmailsRequest = {
            "email": emailRule,
            'type': typeRule,
        };

        return createEmailsRequest;
    }
    
    getData = async (body = {}) => {
        let emailToPush = {};
        if(! App.lodash.isEmpty(body)) {
            if(body.email) {
                emailToPush.email =  body.email;
            }
            
            if(body.type) {
                emailToPush.type =  body.type;
            }
        }

        return emailToPush;
    }
}

module.exports = AddEmailRequest;