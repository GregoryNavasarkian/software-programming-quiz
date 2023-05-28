const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/quizAuth.js');

// already have the quiz and candidate data from the middleware
router.route("/:quizId").get(protect, (req, res) => {
  res.status(200).json({ success: true, candidate: req.candidate, quiz: req.quiz });
});

module.exports = router;