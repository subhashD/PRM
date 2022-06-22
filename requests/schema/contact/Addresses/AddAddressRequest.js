var ObjectId = require('mongoose').Types.ObjectId;
const CountryRepository = require( "../../../../repositories/CountryRepository" ); // Contact Repo Layer

class AddAddressRequest {

    constructor () {
        // if withContact = true : no need to check for unique rule
    }

    getRules = () => {
        
        const countryIdValidator = async (country, { req }) => {
            if(country){
                try {
                    const countryRepositoryInstance = new CountryRepository();
                    const result = await countryRepositoryInstance.findById(country);
                    
                    if(!App.lodash.isEmpty(result)) {
                        if(result._id != country) {
                            throw Error('Country is not valid!');
                        }
                        return true;
                    }
                    return true;
                } catch (err) {
                    // console.log(err.name);
                    throw Error('Country Id is not valid!');
                }
                
            }
        
            throw Error('Not a valid request!');
        }

        const createAddressRequest = {
            'label': {
                notEmpty: true,
                isString: true,
                errorMessage: "Label field is mandatory."
            },
            'street': {
                optional: true,
                isString: true,
                errorMessage: "Street field should be a valid String."
            },
            'city': {
                optional: true,
                isString: true,
                errorMessage: "City field should be a valid String."
            },
            'province': {
                optional: true,
                isString: true,
                errorMessage: "Province field should be a valid String."
            },
            'postal_code': {
                optional: true,
                isString: true,
                errorMessage: "Postal code field should be a valid String."
            },
            'country': {
                notEmpty: true,
                errorMessage: "Country field should be a valid Country Id.",
                custom: {
                    options: countryIdValidator
                }
            },
            'latitude': {
                optional: true,
                isFloat: true,
                errorMessage: "Latitude field should be a valid location point."
            },
            'longitude': {
                optional: true,
                isFloat: true,
                errorMessage: "Longitude field should be a valid location point."
            },
            
        };

        return createAddressRequest;
    }
    
    getData = async (body = {}) => {
        let addressToPush = {};
        if(! App.lodash.isEmpty(body)) {
            addressToPush.label =  body.label;
            addressToPush.country =  body.country;
            
            if(body.street) {
                addressToPush.street = body.street;
            }
            if(body.city) {
                addressToPush.city = body.city;
            }
            if(body.province) {
                addressToPush.province = body.province;
            }
            if(body.latitude) {
                addressToPush.latitude = body.latitude;
            }
            if(body.postal_code) {
                addressToPush.postal_code = body.postal_code;
            }
            if(body.longitude) {
                addressToPush.longitude = body.longitude;
            }
        }

        return addressToPush;
    }
}

module.exports = AddAddressRequest;