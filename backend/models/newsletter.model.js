const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true
    }
  },
  {
    database: "software-quiz",
    collection: "newsletters"
  }
);

module.exports = mongoose.model('Newsletter', newsletterSchema);
