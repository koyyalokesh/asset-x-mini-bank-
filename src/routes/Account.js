const express = require('express');
const bankRouter = express.Router();
const Account = require('../models/account');
const User = require('../models/user');
const {userAuth} = require('../middleware/auth')
const mongoose = require('mongoose');
bankRouter.post('/account/create', async (req, res) => {
  try {
      const { user_id } = req.body;
      console.log(`Account creation request received: user_id=${user_id}`);

      // Validate user_id format (MongoDB ObjectId)
      if (!mongoose.Types.ObjectId.isValid(user_id)) {
          console.error('Invalid user ID format');
          return res.status(400).json({ error: 'Invalid user ID format' });
      }

      // Check if the user already has an account
      const existingAccount = await Account.findOne({ user_id });
      if (existingAccount) {
          console.error('User already has an account');
          return res.status(400).json({ error: 'User already has an account' });
      }
      const user = await User.findById(user_id);

      // Create a new account with an initial balance of 0
      const newAccount = new Account({
          user_id,
          balance: 0, // Default balance
          fullName:user.fullName
      });

      // Save the new account
      await newAccount.save();

      console.log(`Account created successfully: account_id=${newAccount._id}`);
      res.status(201).json({
          message: 'Account created successfully',
          fullName: user.fullName,
          account_id: newAccount._id,
          user_id: newAccount.user_id,
          balance: newAccount.balance,
          
      });

  } catch (error) {
      console.error('Error creating account:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = bankRouter;