const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.js');

const { getQuizzes, getQuiz, createQuiz, updateQuiz, deleteQuiz } = require('../controllers/quiz.js');

router.route("/").get(protect, getQuizzes).post(protect, createQuiz);

router.route("/:id").get(protect, getQuiz).put(protect, updateQuiz).delete(protect, deleteQuiz);

module.exports = router;