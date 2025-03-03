const express = require('express');
const balanceRouter = express.Router();
const Account = require('../models/account');
const {userAuth} = require('../middleware/auth');
const mongoose = require('mongoose');


balanceRouter.get('/account/balance/:account_id', userAuth, async (req, res) => {
    try {
        const { account_id } = req.params;
        console.log(`Fetching balance for account_id: ${account_id}`);

        // Validate account_id format (assuming MongoDB ObjectId)
        if (!mongoose.Types.ObjectId.isValid(account_id)) {
            console.error('Invalid account ID format');
            return res.status(400).json({ error: 'Invalid account ID format' });
        }

        // Find account by account_id
        const account = await Account.findById(account_id);
        if (!account) {
            console.error('Account not found');
            return res.status(404).json({ error: 'Account not found' });
        }

        // Success response
        console.log(`Balance fetched successfully: ${account.balance}`);
        res.json({ account_id: account._id, balance: account.balance });

    } catch(error) {
        console.error('Error fetching account balance:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = balanceRouter;