const router = require('express').Router();
const { Product } = require('../models');
const { Customer } = require('../models');
const { truncate } = require('../models/Items');
//adding Auth and
const withAuth = require('../utils/auth');
//const { sequelize } = require('../models');
const sequelize = require('../config/connection');

//req.session.loggedIn = true;


router.get('/', (req, res) => {
  res.render('login', {
    title: 'Login'
  });
});

router.get('/products', (req, res) => {
  res.render('productsPage', { title: 'Products' });
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

router.get('/ordermain', async (req, res) => {
  try {
    
    const sqlQuery = `
    SELECT
      c.first_name,
      c.last_name,
      tm.transaction_id,
      tm.created_date,
      c.customer_id,
    
    
      SUM(p.price) AS total_price,
      tm.ordered
  FROM 
      customers c
  JOIN 
      transactionsmains tm ON c.customer_id = tm.customer_id
  JOIN 
      transactionsdetails td ON tm.transaction_id = td.transaction_id
  JOIN 
      products p ON td.product_id = p.product_id
  GROUP BY 
      tm.transaction_id,tm.created_date, c.customer_id;
    `;

    const [results] = await sequelize.query(sqlQuery);

    console.log(results);

    const serializedData = results.map((data) => ({
      transaction_id: data.transaction_id,
      created_date: data.created_date,
      customer_id : data.customer_id,
      first_name: data.first_name,
      last_name: data.last_name,
      total: data.total_price,
      ordered: data.ordered,
      
    }));

    res.render('orderMain', { data: serializedData });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get('/orderDetail', async (req, res) => {
  try {
    
    const sqlQuery = `
    SELECT 
    tm.transaction_id,
    p.product_id,
    p.product_name,
    p.product_description,
    sum(p.price) as total,
    p.product_url,

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
     p.product_id,tm.transaction_id,p.price, p.product_name, p.product_description, p.product_url;
    `;

    const [results] = await sequelize.query(sqlQuery);

    console.log(results);

    const serializedData = results.map((data) => ({
      transaction_id: data.transaction_id,
      product_id: data.product_id,
      product_name: data.product_name,
      product_description: data.product_description,
      total: data.total,
      product_url: data.product_url,
      Qty: data.Qty
      
      
    }));

    res.render('orderdetail', { data: serializedData });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});





















module.exports = router;
