const router = require('express').Router();

router.get('/', (req, res) => {
    res.send({ message: "Hello from user!!", user: req.user});
});

router.get('/:id', (req, res) => {
    res.send({ message: "Hello User !!", id: req.params.id});
});

router.post('/', (req, res) => {
    res.send({ message: "Hello User with post method !!", body: req.body});
});


module.exports = router;