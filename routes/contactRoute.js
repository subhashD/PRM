const router = require('express').Router();
const {checkSchema} = require('express-validator');
const contactController = require('../controllers/ContactController');
const validateRules = require('../requests/validateRules');
const contactRequest = require('../requests/schema/contactRequest');

router.post('/', validateRules(checkSchema(contactRequest)), contactController.create);


module.exports = router;