ASSET-X(MINI BANK APPLICATION)

Overview:
This Mini Bank Application is a simple banking system built using Node.js, Express.js, and MongoDB. It allows users to register, create bank accounts, deposit, withdraw, and check balances securely.

Features:
1.User Registration & Authentication
2.Account Creation & Management
3.Deposit Money
4.Withdraw Money
5.Check Account Balance

Technologies Used:
Backend: Node.js, Express.js
Database: MongoDB (Mongoose for schema management)
Authentication: JSON Web Tokens (JWT)
Validation: Express Validator
Security: bcrypt.js for password hashing, helmet for security

API Endpoints:
1️⃣ User API (Authentication & Registration)
Endpoint: /signup
Registers a new user and stores credentials securely.
Requires: fullName, email, phone, password.
Endpoint: /login
Logs in an existing user and returns a JWT token.
Requires: email, password.

2️⃣ Account API (Create and Manage Accounts)
Endpoint: /account/create
Creates a bank account linked to the user_id.
Requires: user_id.

3️⃣ Balance API (Check Account Balance)
Endpoint: /account/balance/:account_id
Retrieves the current balance of a user’s account.

4️⃣ Deposit API (Add Money to Account)
Endpoint: /account/deposit
Adds money to a specific user’s account.
Requires: account_id, amount.

5️⃣ Withdraw API (Withdraw Money)
Endpoint: /account/withdraw
Withdraws money from a user’s account.
Requires: account_id, amount.
Checks if the balance is sufficient before processing.

Database Schema:
1️⃣ Users Collection (users)
{
    "_id": "ObjectId",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "password": "hashed_password",
    "createdAt": "2025-03-01T12:00:00Z"
}

2️⃣ Accounts Collection (accounts)
{
    "_id": "ObjectId",
    "user_id": "ObjectId",
    "accountNumber": "1234567890",
    "balance": 1000,
    "createdAt": "2025-03-01T12:00:00Z"
}


Installation & Setup
# Clone the repository
git clone https://github.com/yourusername/mini-bank-app.git
cd mini-bank-app
# Install dependencies
npm install
# Set up environment variables (create a .env file)
PORT=3000
MONGO_URI=mongodb://localhost:27017/asset-x
JWT_SECRET=your_secret_key
# Start the server
npm start

Usage:
Register a new user
Create a bank account
Deposit and withdraw funds
Check account balance

Security Measures:
JWT Authentication to protect user data.
Password Hashing with bcrypt.js.
Input Validation using Express Validator.
Error Handling with middleware


