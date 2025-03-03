const mongoose = require('mongoose');


const connectDB = async ()=>{
    await mongoose.connect(process.env.DB_CONNECTION_SECRET);
};

module.exports = connectDB; 

//mongodb+srv://lokesh_2:NAP38gTqVJNJcA1P@cluster0.wflbxq8.mongodb.net/asset-x