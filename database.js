const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MongoDb_Url);
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectToDatabase;
