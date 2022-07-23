const ApplicationError = require('../../util/errors/ApplicationError');
const AuthService = require('../../services/Auth/AuthService');
const AuthServiceInstance = new AuthService();
const UserTransformer = require('../../transformers/User/UserTransformer');
const LoginTransformer = require('../../transformers/User/LoginTransformer');

module.exports = {

    login: async (req, res) => {
        const response = await AuthServiceInstance.login( req.body );
        
        if(response.success) {
            // let transformedData = await App.helpers.transformer(req, response.data, UserTransformer);
            const transformedData = await (new LoginTransformer()).getTransformedData(req, response.data);
            
            return res.success(transformedData, response.message);
        }
        return res.error( response.data, response.message );
    },

    register: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const response = await AuthServiceInstance.create( req.body );
            if(response.success) {
                // let transformedData = await App.helpers.transformer(req, response.data, UserTransformer);
                const transformedData = await (new LoginTransformer()).getTransformedData(req, response.data);
    
                return res.success(transformedData, response.message);
            }
            return res.error( response.data, response.message );
        } catch ( err ) {
            res.error( err, null, 500 );
        }
    },

    tokenRefresh: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const response = await AuthServiceInstance.tokenRefresh( req.body );
            if(response.success) {
                // let transformedData = await App.helpers.transformer(req, response.data, UserTransformer);
                const transformedData = await (new LoginTransformer()).getTransformedData(req, response.data);
    
                return res.success(transformedData, response.message);
            }
            return res.error( response.data, response.message );
        } catch ( err ) {
            const data = {};
            data.errors = err.message;
            res.error( data, null, 500 );
        }
    },

    get: async (req, res) => {
        const response = await AuthServiceInstance.findUserById( req.params.userId );
        
        if(response.success) {
            const transformedData = await (new UserTransformer()).getTransformedData(req, response.data);
            
            return res.success(transformedData, response.message);
        }
        return res.error( response.data, response.message );
    },

}
