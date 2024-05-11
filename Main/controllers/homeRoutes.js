const router = require('express').Router();
const { Items } = require('../models');


router.get('/',  async (req, res) => {
  try {
    const itemData = await Items.findAll({
      order: [['name', 'ASC']],
    });
    const Item = itemData.map((project) => project.get({ plain: true }));
    console.log(Item);
    res.render('homepage', {
      Item,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
