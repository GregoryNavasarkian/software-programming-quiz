const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
      required: true,
    },
    // each question has a question type, question text, choices, and correct answer(s)
    questions: [
      {
        questionType: {
          type: String,
          enum: ["multiple-choice", "true-false", "short-answer", "select-all"],
          required: [true, "Please add a question type"],
        },
        questionText: {
          type: String,
          required: [true, "Please add a question"],
        },
        choices: [
          {
            type: String,
          },
        ],
        correctAnswers: [
          {
            type: String,
          },
        ],
      },
    ],
    // each quiz has a time limit
    timeLimit: {
      type: Number,
      required: [true, "Please add a time limit"],
    },
    accessKey: {
      type: String,
      required: [true, "Please add an access key"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    database: "software-quiz",
    collection: "quizzes",
  }
);

const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;
