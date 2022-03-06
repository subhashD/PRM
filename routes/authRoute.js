const router = require('express').Router();
const authController = require('../controllers/AuthController');
const authMiddleware = require('../middlewares/auth');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/token', authMiddleware.authenticate(), authController.tokenRefresh);


module.exports = router;