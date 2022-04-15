const router = require('express').Router();
const genderController = require('../controllers/GenderController');

router.get('/seed', genderController.seedData);
router.get('/', genderController.all);
router.get('/:id', genderController.get);


module.exports = router;