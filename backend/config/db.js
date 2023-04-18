const mongoose = require('mongoose');

MONGO_URI = mongodb+srv; //admin:CS467gm@software-quiz-db.rm1gjpy.mongodb.net/software-quiz?retryWrites=true&w=majority

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;