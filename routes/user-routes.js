const authController = require('../controllers/AuthController');
const userPrefix = 'user';
let commonMiddleware = [
	'auth.jwt', // to check if token exists and is valid
]

module.exports = {

	[`GET ${userPrefix}/:userId`]: {
		action: authController.get,
		name: 'user.get',
		middlewares: [
            ...commonMiddleware
        ]
	},

}