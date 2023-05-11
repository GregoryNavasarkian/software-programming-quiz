const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.js');

const { getCandidates, getCandidate, createCandidate, updateCandidate, deleteCandidate } = require('../controllers/candidate.js');

// base route /candidate
router.route("/:quizID").get(protect, getCandidates).post(protect, createCandidate);

router.route("/:id").get(protect, getCandidate).put(protect, updateCandidate).delete(protect, deleteCandidate);

module.exports = router;
