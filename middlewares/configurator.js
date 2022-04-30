const AuthMiddleware = require('./auth');
const GeneralMiddleware = require('./general');
const ResponseMacroMiddleware = require('./responses');
const RequestInterceptorMiddleware = require('./request-interceptor');
const UserLoginMiddleware = require('./user-login');

// Policies
// const StudentPolicy = require('./policies/student.policy');
// const AdminPolicy = require('./policies/admin.policy');

module.exports = {

    general: GeneralMiddleware,
    responses: ResponseMacroMiddleware,
    requestInterceptor: RequestInterceptorMiddleware,
    auth: {
        jwt: AuthMiddleware.jwt,
        userLogin: UserLoginMiddleware,
    },
    policy: {}

};