const express = require('express');
const DepositRouter = express.Router();
const Account = require('../models/account');
const {userAuth} = require('../middleware/auth');
const mongoose = require('mongoose');

DepositRouter.post('/account/deposit', userAuth, async (req, res) => {
    try {
        const { account_id, amount } = req.body;
        
        // Validate account_id format (MongoDB ObjectId)
        if (!mongoose.Types.ObjectId.isValid(account_id)) {
            console.error('Invalid account ID format');
            return res.status(400).json({ error: 'Invalid account ID format' });
        }

        // Validate amount (must be a positive number)
        if (!amount || typeof amount !== 'number' || amount <= 0) {
            console.error('Invalid deposit amount');
            return res.status(400).json({ error: 'Deposit amount must be a positive number' });
        }

        // Find account by account_id
        const account = await Account.findById(account_id);
        if (!account) {
            console.error('Account not found');
            return res.status(404).json({ error: 'Account not found' });
        }

        // Update balance
        account.balance += amount;
        await account.save();

        console.log(`Deposit successful: new_balance=${account.balance}`);
        res.json({ message: 'Deposit successful', new_balance: account.balance });

    } catch (error) {
        console.error('Error processing deposit:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

module.exports = DepositRouter;