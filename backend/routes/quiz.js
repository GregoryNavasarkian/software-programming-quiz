const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.js");

const {
  getQuizzes,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  addQuestion,
} = require("../controllers/quiz.js");

router.route("/").get(protect, getQuizzes).post(protect, createQuiz);

router
  .route("/:id")
  .get(protect, getQuiz)
  .put(protect, updateQuiz)
  .delete(protect, deleteQuiz);

router.route("/:id/question").post(protect, addQuestion);

module.exports = router;
