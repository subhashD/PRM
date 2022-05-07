const Transformer = require('../Transformer');
const UserModel = require('../../database/models/user');
const UserTransformer = require('./UserTransformer');

class LoginTransformer extends Transformer {

    async transform(data) {
        const hasUser = App.lodash.has(data, 'user');
        const hasAccessToken = App.lodash.has(data, 'accessToken');

        const responseData = {};
        
        if(hasUser) {
            responseData.user = await (new UserTransformer()).getTransformedData(this.req, data.user);
        }
        
        if(hasAccessToken) {
            responseData.access_token = data.accessToken;
            responseData.refresh_token = data.refreshToken;
        }

        return App.helpers.cloneObj(responseData);
    }

}

module.exports = LoginTransformer;