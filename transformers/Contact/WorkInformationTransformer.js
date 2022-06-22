const Transformer = require('../Transformer');

class WorkInformationTransformer extends Transformer {

    async transform(data) {
        let responseData = {};

        const hasJobTitle = App.lodash.has(data, 'job_title');
        if(hasJobTitle) {
            responseData.job_title = data.job_title;
        }
        
        const hasCompany = App.lodash.has(data, 'company');
        if(hasJobTitle) {
            responseData.company = data.company;
        }

        return App.helpers.cloneObj(responseData);
    }

}

module.exports = WorkInformationTransformer;