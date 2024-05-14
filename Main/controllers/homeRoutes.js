const router = require('express').Router();
const { Product } = require('../models');
const { Customers } = require('../models');

// router.get('/login', (req, res) => {
//   res.render('login', {
//     title: 'Login'
//   });
// });

// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

router.get('/', (req, res) => {
  res.render('productsPage', { title: 'Products' });
});

router.get('/shoppingCart', async (req, res) => {
  try {
    const productData = await Product.findAll({
      order: [['product_name', 'ASC']],
    });
    const Products = productData.map((project) => project.get({ plain: true }));
    const customerData = await Customers.findAll({
      order: [['customer_id', 'ASC']],
    });
    const Customers = customerData.map((project) => project.get({ plain: true }));

    res.render('shoppingCart', {
      title: 'Shopping Cart',
      Products,
      Customers
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
