const router = require('express').Router();
const {checkSchema} = require('express-validator');
const authController = require('../controllers/AuthController');
const authMiddleware = require('../middlewares/auth');
const validateRules = require('../requests/validateRules');
const registrationRequest = require('../requests/schema/registrationRequest');
const loginRequest = require('../requests/schema/loginRequest');

router.post('/login', validateRules(checkSchema(loginRequest)), authController.login);
router.post('/register', validateRules(checkSchema(registrationRequest)), authController.register);
router.post('/token', authMiddleware.authenticate(), authController.tokenRefresh);


module.exports = router;