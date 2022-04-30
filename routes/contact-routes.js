const contactController = require('../controllers/ContactController');
const contactRequest = require('../requests/schema/contactRequest');
const contactsPrefix = 'contacts';
let commonMiddleware = [
	'auth.jwt', // to check if token exists and is valid
]

// router.post('/', validateRules(checkSchema(contactRequest)), contactController.create);


// module.exports = router;

module.exports = {

	[`POST ${contactsPrefix}/create`]: {
		action: contactController.create,
		name: 'contact.create',
		middlewares: [
			...commonMiddleware,
        ],
		validator: contactRequest
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

}