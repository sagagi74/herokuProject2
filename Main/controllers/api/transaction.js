const router = require('express').Router();
const sequelize = require('../../config/connection.js');

router.put('/complete', async (req, res) => {
    console.log(req.session.customer_id)
    try {
        // Disable SQL_SAFE_UPDATES
        await sequelize.query('SET SQL_SAFE_UPDATES = 0;');

        // Start a transaction
        await sequelize.transaction(async (t) => {
            // Update TransactionsMains table
            await sequelize.query(`
                UPDATE TransactionsMains
                SET ordered = 1
                WHERE ordered = 0 AND customer_id = ${req.session.customer_id};
            `, { transaction: t });

            // Update TransactionsDetails table
            await sequelize.query(`
                UPDATE TransactionsDetails AS td
                JOIN TransactionsMains AS tm ON tm.transaction_id = td.transaction_id
                SET td.ordered = 1
                WHERE td.ordered = 0 AND tm.customer_id = ${req.session.customer_id};
            `, { transaction: t });
        })

        // Commit the transaction and enable SQL_SAFE_UPDATES
        await sequelize.query('SET SQL_SAFE_UPDATES = 1;');

        res.status(200).json({ message: 'Transaction completed successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

