const workInformationController = require('../../controllers/Contact/WorkInformationController');

// Validator Schemas
const WorkInformationRequest = require('../../requests/schema/contact/WorkInformationRequest');
// Initiating required Requests for Rules
const workInformationRequestInstance = new WorkInformationRequest();

//middleware and contact route prefix
const workInformationPrefix = 'contacts/:contactId/work-information';
let commonMiddleware = [
	'auth.jwt', // to check if token exists and is valid
];

module.exports = {

	/*<---  work-information's routes start -->*/
	[`GET ${workInformationPrefix}`]: {
		action: workInformationController.get,
		name: 'contact.getWorkInformation',
		middlewares: [
			...commonMiddleware,
        ]
	},
	
	[`PUT ${workInformationPrefix}`]: {
		action: workInformationController.update,
		name: 'contact.updateWorkInformation',
		middlewares: [
			...commonMiddleware,
        ],
		validator: workInformationRequestInstance.getRules()
	},
	
	[`DELETE ${workInformationPrefix}`]: {
		action: workInformationController.delete,
		name: 'contact.deleteWorkInformation',
		middlewares: [
			...commonMiddleware,
        ]
	},
	/*<---  work-information's routes end -->*/

}