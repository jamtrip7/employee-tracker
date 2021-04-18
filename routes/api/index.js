const router = require('express').Router();
const travellers = require('./travellers');
const trips = require('./trips');

router.use('/travellers', travellers);
router.use('/trips', trips);

module.exports = router;
