const router = require('express').Router();

router.use('/users', require('./users.route'));
router.use('/gifts', require('./gifts.route'));

module.exports = router;