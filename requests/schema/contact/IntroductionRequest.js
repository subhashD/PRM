var ObjectId = require('mongoose').Types.ObjectId;
const ContactRepository = require('./../../../repositories/ContactRepository');

class IntroductionRequest {

    constructor () {
        //
    }

    getRules = () => {
        
        const firstMetDateTypeValidator = async (value, { req }) => {
            if(req.body.is_first_met_date_known && !App.lodash.has(req.body, 'first_met_date_type')) {
                throw Error('first_met_date_type is required when is_first_met_date_known is true!');
            }

            const contactRepositoryInstance = new ContactRepository();
            const dateTypes = contactRepositoryInstance.getFirstMetDateTypes();
            if(App.lodash.has(dateTypes, req.body.first_met_date_type)) {
                var isDateValid = false;
                var firstMetDate = null;
                switch(req.body.first_met_date_type) {
                    case 1:
                        firstMetDate = App.moment({ 
                            year: req.body.first_met_year, 
                            month: req.body.first_met_month - 1, 
                            day: req.body.first_met_day
                        });

                        isDateValid = firstMetDate.isValid();
                        break;
                    
                    case 2:
                        firstMetDate = App.moment({ 
                            year: req.body.first_met_year, 
                            month: req.body.first_met_month - 1
                        });

                        isDateValid = firstMetDate.isValid();
                        break;
                        
                    case 3:
                        firstMetDate = App.moment({ 
                            month: req.body.first_met_month - 1, 
                            day: req.body.first_met_day
                        });

                        isDateValid = firstMetDate.isValid();
                        break;

                    case 4:
                        firstMetDate = App.moment({ 
                            year: req.body.first_met_year
                        });

                        isDateValid = firstMetDate.isValid();
                        break;
                }
                
                if(!isDateValid) {
                    throw Error('Invalid First met date values!');
                }
                return true;
            }

            throw Error('first_met_date_type is not valid!');
        }
        
        const introductionRequest = {
            information: {
                optional: true,
                isString: true,
                errorMessage: "Information field should be a string"
            },
            first_met_at: {
                optional: true,
                isString: true,
                errorMessage: "First met at field should be a string."
            },
            is_first_met_date_known: {
                notEmpty: true,
                isBoolean: true,
                errorMessage: "Is first met date known field should be a boolean true|false."
            },
            first_met_date_type: {
                bail: true,
                custom: {
                    options : firstMetDateTypeValidator
                },
                isInt: true,
                errorMessage: "Is first met date type field should be a integer.",
            },
            first_met_day: {
                optional: true,
                isInt: true,
                errorMessage: "first_met_day should be and integer value"
            },
            first_met_month: {
                optional: true,
                isInt: true,
                errorMessage: "first_met_month should be and integer value"
            },
            first_met_year: {
                optional: true,
                isInt: true,
                errorMessage: "first_met_year should be and integer value"
            },
            met_through_contact: {
                optional: true,
                isInt: true,
                errorMessage: "Met through contact field should be a integer."
            }
        };

        return introductionRequest;
    }
    
    getData = async (body = []) => {
        let introductionToUpdate = {
            information: body.information, 
            first_met_at: body.first_met_at, 
            is_first_met_date_known: body.is_first_met_date_known,
        };

        if(body.is_first_met_date_known) {
            introductionToUpdate.first_met_date_type = body.first_met_date_type;
            let firstMetOn = {};

            switch(body.first_met_date_type) {
                case 1: 
                    firstMetOn = {
                        day: body.first_met_day,
                        month: body.first_met_month,
                        year: body.first_met_year
                    };
                    break;
                
                case 2:
                    firstMetOn = {
                        month: body.first_met_month,
                        year: body.first_met_year
                    };
                    break;
                
                case 3:
                    firstMetOn = {
                        day: body.first_met_day,
                        month: body.first_met_month
                    };
                    break;

                case 4:
                    firstMetOn = {
                        year: body.first_met_year
                    };
                    break;
            }

            introductionToUpdate.first_met_on = firstMetOn;
        }

        if(body.met_through_contact) {
            introductionToUpdate.met_through_contact = body.met_through_contact;
        }
        
        return introductionToUpdate;
    }
}

module.exports = IntroductionRequest;