const sequelize = require('../config/connection');
const {Product} = require('../models');
const {Customers} = require('../models');
const {TransactionsDetails} = require('../models');
const {TransactionsMains} = require('../models');
const productData = require('./productData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Product.bulkCreate(productData, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};

seedDatabase();