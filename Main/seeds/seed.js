const sequelize = require('../config/connection');
const { Items } = require('../models');

const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Items.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};

seedDatabase();
