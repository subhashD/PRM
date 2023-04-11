const authController = require('../../controllers/Auth/AuthController')
const registrationRequest = require('../../requests/schema/registrationRequest')
const loginRequest = require('../../requests/schema/loginRequest')
const authPrefix = 'auth'

// router.post('/login', validateRules(checkSchema(loginRequest)), authController.login);
// router.post('/register', validateRules(checkSchema(registrationRequest)), authController.register);
// router.post('/token', authMiddleware.authenticate(), authController.tokenRefresh);

// module.exports = router;

module.exports = {
  [`POST ${authPrefix}/login`]: {
    action: authController.login,
    name: 'auth.login',
    middlewares: [],
    validator: loginRequest,
  },

  [`POST ${authPrefix}/register`]: {
    action: authController.register,
    name: 'auth.register',
    middlewares: [],
    validator: registrationRequest,
  },

  [`POST ${authPrefix}/token`]: {
    action: authController.tokenRefresh,
    name: 'auth.token',
    middlewares: ['auth.jwt'],
  },
}
