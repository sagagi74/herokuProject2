const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Customers extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.passwords);
}};

Customers.init(
    {
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      email_address:{
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      passwords: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      session_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      created_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
      }
    },
    { 
      hooks: {
        beforeCreate: async (newUserData) => {
          newUserData.passwords = await bcrypt.hash(newUserData.passwords, 10);
          return newUserData;
        },
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'customers',
    }
)

module.exports = Customers;