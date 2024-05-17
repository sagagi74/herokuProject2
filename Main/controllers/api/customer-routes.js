const router = require('express').Router();
const { Customers } = require('../../models');

// CREATE new customer
router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const dbCustomerData = await Customers.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email_address: req.body.email_address,
      password: req.body.password,
    });

    // Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbCustomerData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  console.log(req.body);
  try {
    const dbCustomerData = await Customers.findOne({ where: { email_address: req.body.email } });
    // console.log(dbCustomerData);
    // console.log(req.body.password);
    if (!dbCustomerData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    // console.log(dbCustomerData);

    const validPassword = await dbCustomerData.checkPassword(req.body.password);
    // console.log(validPassword);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    // Once the user successfully logs in, set up the sessions variable 'loggedIn'
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.customer_id = dbCustomerData.customer_id;
      res
        .status(200)
        .json({ customer: dbCustomerData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  // When the user logs out, destroy the session
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;