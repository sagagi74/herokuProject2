const router = require('express').Router();

const customerRoutes = require('./customer-routes');

router.use('/customer', customerRoutes);

module.exports = router;
