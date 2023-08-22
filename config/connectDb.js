const mongoose = require("mongoose");
// const colors = require("colors");
const connectDb = async () => {
  try {
    console.log(process.env.MONGO_URL);
    const result = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Server Running On ${mongoose.connection.host}`);
    // console.log(result)
  } catch (error) {
    console.log(`${error}`);
  }
};

module.exports = connectDb;