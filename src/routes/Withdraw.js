const express = require('express');
const withdrawRouter = express.Router();
const Account = require('../models/account');
const User = require('../models/user');
const {userAuth} = require('../middleware/auth')
const mongoose = require('mongoose');

withdrawRouter.post('/account/withdraw',userAuth, async (req, res) => {
    try {
        const { account_id, amount } = req.body;
       

        // Validate account_id format (MongoDB ObjectId)
         if (!mongoose.Types.ObjectId.isValid(account_id)) {
                    console.error('Invalid account ID format');
                    return res.status(400).json({ error: 'Invalid account ID format' });
                }

        // Validate amount (must be a positive number)
        if (!amount || typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ error: 'Withdrawal amount must be a positive number' });
        }

        // Find account by account_id
        const account = await Account.findOne({ account_id });
        if (!account) {
           // console.error('Account not found');
            return res.status(404).json({ error: 'Account not found' });
        }

        // Check for sufficient balance
        if (account.balance < amount) {
            console.error('Insufficient funds');
            return res.status(400).json({ error: 'Insufficient funds' });
        }

        // Deduct balance
        account.balance -= amount;
        await account.save();
        res.json({ message: 'Withdrawal successful', new_balance: account.balance });

    } catch (error) {
        console.error('Error processing withdrawal:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

module.exports = withdrawRouter;