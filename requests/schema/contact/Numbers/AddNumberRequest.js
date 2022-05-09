var ObjectId = require('mongoose').Types.ObjectId;
const ContactRepository = require( "../../../../repositories/ContactRepository" ); // Contact Repo Layer

class AddNumberRequest {

    constructor (withContact = false) {
        // if withContact = true : no need to check for unique rule
        this.withContact = withContact;
    }

    getRules = (isUpdate = false) => {
        

        let contactRule = {
            isMobilePhone: true,
            errorMessage: "Contact field should be a valid Contact number.",
        };
        
        let countryCodeRule = {
            isString: true,
            errorMessage: "Type field should be a string.",
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
            // add more conditions for contact field 
            contactRule.notEmpty = true;
            countryCodeRule.notEmpty = true;
            
            // add more conditions for type field 
            typeRule.notEmpty = true;

        } else {
            // add more conditions for contact field 
            contactRule.optional = true;
            countryCodeRule.optional = true;
            
            // add more conditions for type field 
            typeRule.optional = true;

            let contactUniqueValidator = null;
            if(isUpdate) {
                contactUniqueValidator = async (contact, { req }) => {
                    if(req.params.contactId && req.params.numberId){
                        const contactRepositoryInstance = new ContactRepository();
                        let queryProjection = {
                            numbers: {
                                $elemMatch: {
                                    contact: contact,
                                },
                            },
                        };

                        const result = await contactRepositoryInstance.findOne( {
                            '_id': req.params.contactId, 
                            'numbers.contact': contact
                        }, queryProjection );

                        if(!App.lodash.isEmpty(result) && !App.lodash.isEmpty(result.numbers)) {
                            if(result.numbers[0]._id != req.params.numberId) {
                                throw Error('Contact number already exists!');
                            }
                            return true;
                        }
                        return true;
                    }
                
                    throw Error('Not a valid request!');
                }
            } else {
                contactUniqueValidator = async (contact, { req }) => {
                    if(req.params.contactId){
                        let queryProjection = {
                            numbers: {
                                $elemMatch: {
                                    contact: contact,
                                },
                            },
                        };

                        const contactRepositoryInstance = new ContactRepository();
                        const result = await contactRepositoryInstance.findOne( {
                            '_id': req.params.contactId, 
                            'numbers.contact': contact
                        }, queryProjection );
                        if(!App.lodash.isEmpty(result) && !App.lodash.isEmpty(result.numbers)) {
                            throw Error('Contact number already exists!');
                        }
                        return true;
                    }
                
                    throw Error('Not a valid request!');
                }
            }
            // add custom unique validator
            contactRule.custom = {
                options: contactUniqueValidator
            };
        }

        const createNumbersRequest = {
            "country_code": countryCodeRule,
            "contact": contactRule,
            'type': typeRule,
        };

        return createNumbersRequest;
    }
    
    getData = async (body = {}) => {
        let numbersToPush = {};
        if(! App.lodash.isEmpty(body)) {
            if(body.country_code) {
                numbersToPush.country_code =  body.country_code;
            }
            
            if(body.contact) {
                numbersToPush.contact =  body.contact;
            }
            
            if(body.type) {
                numbersToPush.type =  body.type;
            }
            
            if(body.is_active) {
                numbersToPush.is_active =  body.is_active;
            }
        }

        return numbersToPush;
    }
}

module.exports = AddNumberRequest;