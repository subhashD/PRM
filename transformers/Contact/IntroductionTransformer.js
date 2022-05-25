const Transformer = require('../Transformer');
const GenderModel = require('../../database/models/gender');

class IntroductionTransformer extends Transformer {

    async transform(data) {
        let responseData = {};

        const hasIntroduction = App.lodash.has(data, 'information');
        if(hasIntroduction) {
            responseData.information = data.information; 
            responseData.first_met_at = data.first_met_at; 
            responseData.first_met_date_type = data.first_met_date_type; 
            responseData.is_first_met_date_known = data.is_first_met_date_known; 
            responseData.first_met_on = data.first_met_on; 
        }

        return App.helpers.cloneObj(responseData);
    }

}

module.exports = IntroductionTransformer;