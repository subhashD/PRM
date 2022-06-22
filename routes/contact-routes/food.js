const foodController = require('../../controllers/Contact/FoodController');

// Validator Schemas
const FoodRequest = require('../../requests/schema/contact/FoodRequest');
// Initiating required Requests for Rules
const foodRequestInstance = new FoodRequest();

//middleware and contact route prefix
const foodPreferencePrefix = 'contacts/:contactId/food-preference';
let commonMiddleware = [ 
	'auth.jwt', // to check if token exists and is valid
];

module.exports = {

	/*<---  food-preference's routes start -->*/
	[`GET ${foodPreferencePrefix}`]: {
		action: foodController.get,
		name: 'contact.getFoodPreference',
		middlewares: [
			...commonMiddleware,
        ]
	},
	
	[`PUT ${foodPreferencePrefix}`]: {
		action: foodController.update,
		name: 'contact.updateFoodPreference',
		middlewares: [
			...commonMiddleware,
        ],
		validator: foodRequestInstance.getRules()
	},
	/*<---  food-preference's routes end -->*/

}