const emailsController = require('../../controllers/Contact/EmailsController');

// Validator Schemas
const AddEmailRequest = require('../../requests/schema/contact/Emails/AddEmailRequest');
const PushEmailsRequest = require('../../requests/schema/contact/Emails/PushEmailsRequest');
// Initiating required Requests for Rules
const addEmailRequestInstance = new AddEmailRequest();
const pushEmailsRequestInstance = new PushEmailsRequest();

//middleware and contact route prefix
const emailsPrefix = 'contacts/:contactId/emails';
let commonMiddleware = [
	'auth.jwt', // to check if token exists and is valid
];

// router.post('/', validateRules(checkSchema(contactRequest)), contactController.create);

module.exports = {

	/*<---  contact's emails routes start -->*/
	[`GET ${emailsPrefix}`]: {
		action: emailsController.getEmails,
		name: 'contact.getEmails',
		middlewares: [
			...commonMiddleware,
        ]
	},
	
	[`GET ${emailsPrefix}/:emailId`]: {
		action: emailsController.findEmail,
		name: 'contact.findEmail',
		middlewares: [
			...commonMiddleware,
        ]
	},
	
	// for adding a single email to emails
	[`POST ${emailsPrefix}/add`]: {
		action: emailsController.addNewEmail,
		name: 'contact.addNewEmail',
		middlewares: [
			...commonMiddleware,
        ],
		validator: addEmailRequestInstance.getRules()
	},
	
	// for adding a multiple emails to emails
	[`POST ${emailsPrefix}`]: {
		action: emailsController.pushEmails,
		name: 'contact.pushEmails',
		middlewares: [
			...commonMiddleware,
        ],
		validator: pushEmailsRequestInstance.getRules()
	},

	[`PATCH ${emailsPrefix}/:emailId`]: {
		action: emailsController.updateEmail,
		name: 'contact.updateEmail',
		middlewares: [
			...commonMiddleware,
        ],
		validator: addEmailRequestInstance.getRules(true)
	},
	
	[`DELETE ${emailsPrefix}/:emailId`]: {
		action: emailsController.deleteEmail,
		name: 'contact.deleteEmail',
		middlewares: [
			...commonMiddleware,
        ]
	},
	/*<---  contact's emails routes start -->*/

}