const Product = require('./Items');
const Customer = require('./customer');
const TransactionsMain = require('./transactionmains');
const TransactionsDetail = require('./transactiondetails');

Customer.hasOne(TransactionsMain, {
    foreignKey: 'customer_id',
    onDelete: 'CASCADE'
});

TransactionsMain.belongsTo(Customer, {
    foreignKey: 'customer_id',
});

TransactionsMain.hasOne(TransactionsDetail, {
    foreignKey: 'transaction_id',
    onDelete: 'CASCADE'
});

TransactionsDetail.belongsTo(TransactionsMain, {
    foreignKey: 'transaction_id',
});

Product.hasOne(TransactionsDetail, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE'
});

TransactionsDetail.belongsTo(Product, {
    foreignKey: 'product_id',
});


module.exports = 
{   
    Product,
    Customer,
    TransactionsMain,
    TransactionsDetail
};
    