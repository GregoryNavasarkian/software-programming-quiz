const mongoose = require("mongoose");

const connectDB = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  if (!connection) {
    console.log("MongoDB connection failed");
  }
};

module.exports = connectDB;
