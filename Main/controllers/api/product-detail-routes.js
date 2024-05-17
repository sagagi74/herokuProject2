const router = require('express').Router();
const { Product } = require('../../models');

router.post('/:id',  async (req, res) => {
    try { 
      const newProductTable = await Product.create(
        req.body
      );
      const test = await Product.findAll();
      const testData = test.map((project) => project.get({ plain: true }))
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;