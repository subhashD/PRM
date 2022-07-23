const ApplicationError = require('../../util/errors/ApplicationError');
const UserService = require('../../services/User/UserService');
const UserServiceInstance = new UserService();
const UserTransformer = require('../../transformers/User/UserTransformer');

module.exports = {

    getProfile: async (req, res) => {
        const response = await UserServiceInstance.getProfile( req.header('authorization') );
        if(response.success) {
            const transformedData = await (new UserTransformer()).getTransformedData(req, response.data);
            
            return res.success(transformedData, response.message);
        }
        return res.error( response.data, response.message );
    },

}
