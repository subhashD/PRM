const addressController = require('../../controllers/Contact/AddressController');

// Validator Schemas
const AddAddressRequest = require('../../requests/schema/contact/Addresses/AddAddressRequest');
const PushAddressesRequest = require('../../requests/schema/contact/Addresses/PushAddressesRequest');
// Initiating required Requests for Rules
const addAddressRequestInstance = new AddAddressRequest();
const pushAddressesRequestInstance = new PushAddressesRequest();

//middleware and contact route prefix
const addressPrefix = 'contacts/:contactId/address';
let commonMiddleware = [
	'auth.jwt', // to check if token exists and is valid
];

// router.post('/', validateRules(checkSchema(contactRequest)), contactController.create);

module.exports = {

	/*<---  contact's addresses routes start -->*/
	[`GET ${addressPrefix}`]: {
		action: addressController.getAddresses,
		name: 'contact.getAddress',
		middlewares: [
			...commonMiddleware,
        ]
	},
	
	[`GET ${addressPrefix}/:addressId`]: {
		action: addressController.findAddress,
		name: 'contact.findAddress',
		middlewares: [
			...commonMiddleware,
        ]
	},
	
	// for adding a single address to addresses
	[`POST ${addressPrefix}/add`]: {
		action: addressController.addNewAddress,
		name: 'contact.addNewAddress',
		middlewares: [
			...commonMiddleware,
        ],
		validator: addAddressRequestInstance.getRules()
	},
	
	// for adding a multiple addresses to addresses
	[`POST ${addressPrefix}`]: {
		action: addressController.pushAddresses,
		name: 'contact.pushAddresses',
		middlewares: [
			...commonMiddleware,
        ],
		validator: pushAddressesRequestInstance.getRules()
	},

	[`PATCH ${addressPrefix}/:addressId`]: {
		action: addressController.updateAddress,
		name: 'contact.updateAddress',
		middlewares: [
			...commonMiddleware,
        ],
		validator: addAddressRequestInstance.getRules()
	},
	
	[`DELETE ${addressPrefix}/:addressId`]: {
		action: addressController.deleteAddress,
		name: 'contact.deleteAddress',
		middlewares: [
			...commonMiddleware,
        ]
	},
	
	[`POST ${addressPrefix}/:addressId/active`]: {
		action: addressController.makeAddressActive,
		name: 'contact.makeAddressActive',
		middlewares: [
			...commonMiddleware,
        ]
	},
	/*<---  contact's addresses routes start -->*/

}