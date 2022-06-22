const countryController = require('../../controllers/Country/CountryController');
const countryPrefix = 'countries';
let commonMiddleware = [
	'auth.jwt', // to check if token exists and is valid
]

// module.exports = router;

module.exports = {

	[`GET ${countryPrefix}/seed`]: {
		action: countryController.seedData,
		name: 'countries.seed',
		middlewares: [
            ...commonMiddleware
        ],
	},
	
    [`GET ${countryPrefix}/:id`]: {
		action: countryController.get,
		name: 'countries.get',
		middlewares: [
            ...commonMiddleware
        ],
	},
	
    [`GET ${countryPrefix}/`]: {
		action: countryController.all,
		name: 'countries.all',
		middlewares: [
            ...commonMiddleware
        ],
	},

}