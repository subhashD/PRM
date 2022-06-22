const Transformer = require('../Transformer');
const CountryModel = require('../../database/models/country');

class CountryTransformer extends Transformer {

    async transform(data) {
        let responseData = {};
        responseData = {
            'id': data._id,
            'code': data.code,
            'name': data.name
        }

        return App.helpers.cloneObj(responseData);
    }

}

module.exports = CountryTransformer;