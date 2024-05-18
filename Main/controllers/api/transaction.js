const router = require('express').Router();

router.put('/', async (req, res) => {
    // raw sql query for updating database
    try{ 
        const sqlQuery = `
            START TRANSACTION;
            UPDATE TransactionsMains
            SET ordered = 1
            WHERE ordered = 0 AND customer_id = ${req.session.customer_id};
            
            UPDATE TransactionsDetails
            JOIN TransactionsMains ON TransactionsMains.transaction_id = TransactionsDetails.transaction_id
            SET ordered = 1
            WHERE ordered = 0 AND TransactionsMains.customer_id = ${req.session.customer_id};
            COMMIT;
        `;
        await sequelize.query(sqlQuery);
    }
    catch (err) {
        res.status(500).json(err);
    }
})
module.exports = router;