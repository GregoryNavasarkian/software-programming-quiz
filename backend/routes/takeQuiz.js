const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/quizAuth.js");
const Candidate = require("../models/Candidate.js");
const Employer = require("../models/Employer.js");
const ErrorResponse = require("../utils/errorResponse.js");
const sendEmail = require("../utils/sendEmail.js");

// already have the quiz and candidate data from the middleware
router.route("/:quizId").get(protect, (req, res) => {
  res
    .status(200)
    .json({ success: true, candidate: req.candidate, quiz: req.quiz });
});

router.route("/:quizId/submit").post(protect, async (req, res, next) => {
  const quizId = req.params.quizId;
  const { answers, score } = req.body;
  const candidateId = req.candidate._id;
  try {
    const taken = await Candidate.findOne({
      _id: candidateId,
      quizTaken: { $elemMatch: { quizId: quizId } },
    });
    if (taken) {
      return next(new ErrorResponse(`You have already taken this quiz`, 400));
    }
  } catch (error) {
    next(error);
  }
  try {
    // get employer info
    const employer = await Employer.findById(req.candidate.employer);
    if (!employer) {
      return next(new ErrorResponse(`Cannot get employer`, 404));
    }
    const employerEmail = employer.email;
    const message = `
      <h2>Quiz: ${req.quiz.title}</h2>
      <h3>Candidate: ${req.candidate.name}</h3>
      <h3><i>Score:</i> <strong>${score}</strong></h3>
    `;
    await Candidate.updateOne(
      { _id: candidateId },
      { $push: { quizTaken: { quizId, answers, score } } }
    );
    await sendEmail({
      to: employerEmail,
      subject: `Candidate ${req.candidate.name} has taken the quiz ${req.quiz.title}`,
      text: message,
    });
    res.status(200).json({ success: true, data: "Quiz submitted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
