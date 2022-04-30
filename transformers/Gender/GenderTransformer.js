const Transformer = require('../Transformer');
const GenderModel = require('../../database/models/gender');

class GenderTransformer extends Transformer {

    /* constructor(req, data, transformOptions = null) {
        super(req, data, transformOptions);
        this.model = UserModel;
    } */

    async transform(data) {
        let responseData = {};
        // const hasGender = App.lodash.has(data, 'title');
        // if(hasGender) {
            responseData = {
                'id': data._id,
                'title': data.title,
                // 'createdAt': App.moment(data.createdAt).format('Do MMM, YYYY'),
                // 'updatedAt': App.moment(data.updatedAt).format('Do MMM, YYYY'),
            }
        // }

        return App.helpers.cloneObj(responseData);
    }

}

module.exports = GenderTransformer;