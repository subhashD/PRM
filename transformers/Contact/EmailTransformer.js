const Transformer = require('../Transformer');
const GenderModel = require('../../database/models/gender');

class EmailTransformer extends Transformer {

    async transform(data) {
        let responseData = {};
        const hasEmail = App.lodash.has(data, '_id');
        if(hasEmail) {
            responseData = {
                'id': data._id,
                'type': data.type,
                'email': data.email,
                'is_active': data.is_active
            }
        }

        return App.helpers.cloneObj(responseData);
    }

}

module.exports = EmailTransformer;