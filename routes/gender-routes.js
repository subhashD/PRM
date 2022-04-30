const router = require('express').Router();
const genderController = require('../controllers/GenderController');
const genderPrefix = 'gender';
let commonMiddleware = [
	'auth.jwt', // to check if token exists and is valid
]

// router.get('/seed', genderController.seedData);
// router.get('/', genderController.all);
// router.get('/:id', genderController.get);


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