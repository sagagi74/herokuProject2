const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize('mysql://b1ab8rzpfpd7ts4q:fwfl7g62aw2l7544@qbhol6k6vexd5qjs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/pu3lh9pq7h1yuw91');
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
