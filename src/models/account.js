const mongoose = require('mongoose');


const accountSchema = new mongoose.Schema({
    
    fullName :{
        type:String,
        ref:'User',
    },
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    account_id: {
        type: String,
        unique: true,
        default: function () {
            return this._id.toString(); // Use MongoDB ObjectId as account_id
        }
    },

    balance: {
                type: Number,
                required: true,
                default: 0, // Default balance when creating an account
                min: 0 // Prevents negative balance (unless overdraft is allowed)
            },
            createdAt: {
                type: Date,
                default: Date.now // Automatically sets the account creation time
            }
    
       
    
});
module.exports = mongoose.model('Account', accountSchema);