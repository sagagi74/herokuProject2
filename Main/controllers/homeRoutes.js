const router = require('express').Router();
const { Product } = require('../models');
const { Customer } = require('../models');
<<<<<<< HEAD
// const withAuth = require('../utils/auth');
=======
const { truncate } = require('../models/Items');
//adding Auth and
const withAuth = require('../utils/auth');
//const { sequelize } = require('../models');
const sequelize = require('../config/connection');

//req.session.loggedIn = true;

>>>>>>> 80c37a0f92324620ef21b332d6ab9a7be1f1582a

// router.get('/login', (req, res) => {
//   res.render('login', {
//     title: 'Login'
//   });
// });

// Login route
router.get('/login', (req, res) => {
  // If the customer is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

router.get('/logout', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/', (req, res) => {
  res.render('productsPage', { title: 'Products', loggedIn: req.session.loggedIn }
  );
});

router.get('/shoppingCart', async (req, res) => {
  try {
    const productData = await Product.findAll({
      order: [['product_name', 'ASC']],
    });
    const Products = productData.map((project) => project.get({ plain: true }));
    const customerData = await Customer.findAll({
      order: [['customer_id', 'ASC']],
    });
    const customerVar = customerData.map((project) => project.get({ plain: true }));

    res.render('shoppingCart', {
      title: 'Shopping Cart',
      Products,
      customerVar,
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/shop', async (req, res) => {
  try {
    
    const sqlQuery = `
      SELECT 
        c.first_name,
        c.last_name,
        p.product_name,
        p.product_description,
        p.price,
    
        COUNT(p.product_name) AS QTY
      FROM 
        customers c
      JOIN 
        transactionsmains tm ON c.customer_id = tm.customer_id
      JOIN 
        transactionsdetails td ON tm.Transaction_id = td.Transaction_id
      JOIN 
        products p ON td.Product_id = p.Product_id
      GROUP BY 
        p.price, c.first_name, c.last_name, p.product_name, p.product_description
        where customers.id = ${customerid};
    `;

    const [results] = await sequelize.query(sqlQuery);

    console.log(results);

    const serializedData = results.map((data) => ({
      first_name: data.first_name,
      last_name: data.last_name,
      product_name: data.product_name,
      product_description: data.product_description,
      price: data.price,
      quantity: data.QTY,
    }));

    res.render('shop', { data: serializedData });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});




















module.exports = router;
