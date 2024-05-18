const router = require('express').Router();

const customerRoutes = require('./customer-routes');
const productDetailRoutes = require('./product-detail-routes');

router.use('/customer', customerRoutes);
router.use('/product', productDetailRoutes);

module.exports = router;