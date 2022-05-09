const genderController = require('../../controllers/Gender/GenderController');
const genderPrefix = 'genders';
let commonMiddleware = [
	'auth.jwt', // to check if token exists and is valid
]

// module.exports = router;

module.exports = {

	[`GET ${genderPrefix}/seed`]: {
		action: genderController.seedData,
		name: 'gender.seed',
		middlewares: [
            ...commonMiddleware
        ],
	},
	
    [`GET ${genderPrefix}/:id`]: {
		action: genderController.get,
		name: 'gender.get',
		middlewares: [
            ...commonMiddleware
        ],
	},
	
    [`GET ${genderPrefix}/`]: {
		action: genderController.all,
		name: 'gender.all',
		middlewares: [
            ...commonMiddleware
        ],
	},

}