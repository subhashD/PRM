const numbersController = require('../../controllers/Contact/NumbersController');

// Validator Schemas
const AddNumberRequest = require('../../requests/schema/contact/Numbers/AddNumberRequest');
const PushNumbersRequest = require('../../requests/schema/contact/Numbers/PushNumbersRequest');
// Initiating required Requests for Rules
const addNumberRequestInstance = new AddNumberRequest();
const pushNumbersRequestInstance = new PushNumbersRequest();

//middleware and contact route prefix
const numbersPrefix = 'contacts/:contactId/numbers';
let commonMiddleware = [
	'auth.jwt', // to check if token exists and is valid
]

// router.post('/', validateRules(checkSchema(contactRequest)), contactController.create);

module.exports = {

	/*<---  contact's numbers routes start -->*/
	[`GET ${numbersPrefix}`]: {
		action: numbersController.getNumbers,
		name: 'contact.getNumbers',
		middlewares: [
			...commonMiddleware,
        ]
	},
	
	[`GET ${numbersPrefix}/:numberId`]: {
		action: numbersController.findNumber,
		name: 'contact.findNumber',
		middlewares: [
			...commonMiddleware,
        ]
	},
	
	// for adding a single number to numbers
	[`POST ${numbersPrefix}/add`]: {
		action: numbersController.addNewNumber,
		name: 'contact.addNewNumber',
		middlewares: [
			...commonMiddleware,
        ],
		validator: addNumberRequestInstance.getRules()
	},
	
	// for adding a multiple numbers to numbers
	[`POST ${numbersPrefix}`]: {
		action: numbersController.pushNumbers,
		name: 'contact.pushNumbers',
		middlewares: [
			...commonMiddleware,
        ],
		validator: pushNumbersRequestInstance.getRules()
	},

	[`PATCH ${numbersPrefix}/:numberId`]: {
		action: numbersController.updateNumber,
		name: 'contact.updateNumber',
		middlewares: [
			...commonMiddleware,
        ],
		validator: addNumberRequestInstance.getRules(true)
	},
	
	[`DELETE ${numbersPrefix}/:numberId`]: {
		action: numbersController.deleteNumber,
		name: 'contact.deleteNumber',
		middlewares: [
			...commonMiddleware,
        ]
	},
	/*<---  contact's numbers routes start -->*/

}