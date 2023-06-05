const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.js");

const {
  getCandidates,
  getQuizzesTaken,
  getCandidate,
  createCandidate,
  updateCandidate,
  deleteCandidate,
} = require("../controllers/candidate.js");

// base route /candidate
router
  .route("/:quizID")
  .get(protect, getCandidates)
  .post(protect, createCandidate);

router.route("/:quizID/taken").get(protect, getQuizzesTaken);

router
  .route("/:id")
  .get(protect, getCandidate)
  .put(protect, updateCandidate)
  .delete(protect, deleteCandidate);

module.exports = router;
