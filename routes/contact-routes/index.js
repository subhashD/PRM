const contactController = require('../../controllers/Contact/ContactController');

// Validator Schemas
const CreateContactRequest = require('../../requests/schema/contact/CreateContactRequest');
const UpdateContactRequest = require('../../requests/schema/contact/UpdateContactRequest');
// Initiating required Requests for Rules
const createContactRequestInstance = new CreateContactRequest();
const updateContactRequestInstance = new UpdateContactRequest();

//middleware and contact route prefix
const contactsPrefix = 'contacts';
let commonMiddleware = [
	'auth.jwt', // to check if token exists and is valid
];

//sub-routes
const emailsRoutes = require('./emails');
const numbersRoutes = require('./numbers');
const introductionRoutes = require('./introduction');
const workInformationRoutes = require('./work-information');
const addressRoutes = require('./address');
const foodRoutes = require('./food');

// router.post('/', validateRules(checkSchema(contactRequest)), contactController.create);

module.exports = {

	[`POST ${contactsPrefix}/create`]: {
		action: contactController.create,
		name: 'contact.create',
		middlewares: [
			...commonMiddleware,
        ],
		validator: createContactRequestInstance.getRules()
	},
	
	[`GET ${contactsPrefix}/:contactId`]: {
		action: contactController.get,
		name: 'contact.get',
		middlewares: [
			...commonMiddleware,
        ]
	},
	
	[`GET ${contactsPrefix}/`]: {
		action: contactController.all,
		name: 'contact.all',
		middlewares: [
			...commonMiddleware,
        ]
	},

	[`PATCH ${contactsPrefix}/:contactId`]: {
		action: contactController.update,
		name: 'contact.update',
		middlewares: [
			...commonMiddleware,
        ],
		validator: updateContactRequestInstance.getRules()
	},
	
	[`DELETE ${contactsPrefix}/:contactId`]: {
		action: contactController.delete,
		name: 'contact.delete',
		middlewares: [
			...commonMiddleware,
        ],
	},

	...emailsRoutes,
	
	...numbersRoutes,

	...introductionRoutes,

	...workInformationRoutes,
	
	...addressRoutes,

	...foodRoutes,
	
}