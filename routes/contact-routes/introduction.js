const introductionController = require('../../controllers/Contact/IntroductionController');

// Validator Schemas
const IntroductionRequest = require('../../requests/schema/contact/IntroductionRequest');
// Initiating required Requests for Rules
const introductionRequestInstance = new IntroductionRequest();

//middleware and contact route prefix
const introductionPrefix = 'contacts/:contactId/introduction';
let commonMiddleware = [
	'auth.jwt', // to check if token exists and is valid
];

module.exports = {

	/*<---  introduction's routes start -->*/
	[`GET ${introductionPrefix}`]: {
		action: introductionController.getIntroduction,
		name: 'contact.getIntroduction',
		middlewares: [
			...commonMiddleware,
        ]
	},
	
	[`PUT ${introductionPrefix}`]: {
		action: introductionController.updateIntroduction,
		name: 'contact.updateIntroduction',
		middlewares: [
			...commonMiddleware,
        ],
		validator: introductionRequestInstance.getRules()
	},
	
	[`DELETE ${introductionPrefix}`]: {
		action: introductionController.deleteIntroduction,
		name: 'contact.deleteIntroduction',
		middlewares: [
			...commonMiddleware,
        ]
	},
	/*<---  introduction's routes end -->*/

}