const Product = require('./Items');
const Customers = require('./customers');
const TransactionsMains = require('./transactionmains');
const TransactionsDetails = require('./transactiondetails');

Customers.hasOne(TransactionsMains, {
    foreignKey: 'customer_id',
    onDelete: 'CASCADE'
});

TransactionsMains.belongsTo(Customers, {
    foreignKey: 'customer_id',
});

TransactionsMains.hasOne(TransactionsDetails, {
    foreignKey: 'transaction_id',
    onDelete: 'CASCADE'
});

TransactionsDetails.belongsTo(TransactionsMains, {
    foreignKey: 'transaction_id',
});

Product.hasOne(TransactionsDetails, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE'
});

TransactionsDetails.belongsTo(Product, {
    foreignKey: 'product_id',
});


module.exports = 
{   
    Product,
    Customers,
    TransactionsMains,
    TransactionsDetails 
};
    