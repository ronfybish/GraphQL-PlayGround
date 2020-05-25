const mongoose = require('mongoose');
const dotenv=require('dotenv').config()

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      },()=>console.log('MongoDB thnks Fucking Connected!!!!!'));
      
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };
   
  module.exports = connectDB;