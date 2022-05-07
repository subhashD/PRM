const contactController = require('../controllers/ContactController');
const CreateContactRequest = require('../requests/schema/contact/CreateContactRequest');
const UpdateContactRequest = require('../requests/schema/contact/UpdateContactRequest');
const createContactRequestInstance = new CreateContactRequest();
const updateContactRequestInstance = new UpdateContactRequest();
const contactsPrefix = 'contacts';
let commonMiddleware = [
	'auth.jwt', // to check if token exists and is valid
]

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

	[`GET ${contactsPrefix}/:contactId/emails`]: {
		action: contactController.getEmails,
		name: 'contact.getEmails',
		middlewares: [
			...commonMiddleware,
        ]
	},
	
	[`GET ${contactsPrefix}/:contactId/numbers`]: {
		action: contactController.getNumbers,
		name: 'contact.getNumbers',
		middlewares: [
			...commonMiddleware,
        ]
	},

}