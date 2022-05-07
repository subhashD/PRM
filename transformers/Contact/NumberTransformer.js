const Transformer = require('../Transformer');
const GenderModel = require('../../database/models/gender');

class NumberTransformer extends Transformer {

    async transform(data) {
        let responseData = {};
        const hasNumber = App.lodash.has(data, '_id');
        if(hasNumber) {
            responseData = {
                'id': data._id,
                'type': data.type,
                'country_code': data.country_code,
                'contact': data.contact,
                'is_active': data.is_active
            }
        }

        return App.helpers.cloneObj(responseData);
    }

}

module.exports = NumberTransformer;