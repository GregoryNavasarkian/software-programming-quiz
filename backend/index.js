require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/error.js");

const app = express();
const connectDB = require("./config/db.js");

connectDB();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://software-programming-quiz.onrender.com",
    ],
  })
);

app.get("/", (req, res) => {
  res
    .status(200)
    .json({
      success: true,
      data: "Welcome to the Software Programming Quiz API",
    });
});

app.use("/auth", require("./routes/auth.js"));
app.use("/quiz", require("./routes/quiz.js"));
app.use("/private", require("./routes/private.js"));
app.use("/newsletter", require("./routes/newsletter.js"));
app.use("/candidate", require("./routes/candidate.js"));
app.use("/take-quiz", require("./routes/takeQuiz.js"));

// Error handler (should be last piece of middleware)
app.use(errorHandler);

const server = app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on port 5000");
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});

module.exports = app;
