const express = require('express');
const app = express();
const connectDB = require('./config/database');

const cookieParser = require('cookie-parser');
const port = 4000;

const authRouter = require('./routes/auth');
const bankaccountRouter = require('./routes/Account');
const balanceRouter = require('./routes/Balance');
const depositRouter = require('./routes/Deposit');
const withdrawRouter = require('./routes/Withdraw');

require('dotenv').config();
app.use(cookieParser());


app.use(express.json());
app.use('/', authRouter);
app.use('/', bankaccountRouter);
app.use('/', balanceRouter);
app.use('/', depositRouter);
app.use('/', withdrawRouter);
connectDB()
      .then(()=>{
        console.log('database connected succesfully');
        app.listen(process.env.PORT ,(req,res)=>{
            console.log("server listening on port no "+ process.env.PORT);
            
        });
        })
      .catch(()=>{
        console.log('database not connected succesfully');
      });

