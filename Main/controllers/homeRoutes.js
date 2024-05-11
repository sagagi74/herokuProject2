const router = require('express').Router();
const { Product } = require('../models');


router.get('/',  async (req, res) => {
  try {
    const productData = await Product.findAll({
      order: [['name', 'ASC']],
    });
    const Products = productData.map((project) => project.get({ plain: true }));
    res.render('shoppingCart', {
      Products,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
