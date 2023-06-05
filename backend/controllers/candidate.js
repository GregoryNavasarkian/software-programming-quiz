const Candidate = require("../models/Candidate");
const Quiz = require("../models/Quiz");
const ErrorResponse = require("../utils/errorResponse.js");
const sendEmail = require("../utils/sendEmail.js");

// @desc    Get all candidates
// @route   GET /candidate/:quizID
// @access  Private
exports.getCandidates = async (req, res, next) => {
  try {
    const candidates = await Candidate.find({
      employer: req.employer.id,
      quizAssigned: { $elemMatch: { quizId: req.params.quizID } },
    });
    if (!candidates) {
      return next(new ErrorResponse(`No candidates found`, 404));
    }
    res.status(200).json({ success: true, candidates: candidates });
  } catch (error) {
    next(error);
  }
};

// @desc    Get quizzes taken by candidates
// @route   GET /candidate/:quizID/taken
// @access  Private
exports.getQuizzesTaken = async (req, res, next) => {
  try {
    const candidates = await Candidate.find({
      employer: req.employer.id,
      quizAssigned: { $elemMatch: { quizId: req.params.quizID } },
    });
    if (!candidates) {
      return next(new ErrorResponse(`No candidates found`, 404));
    }
    const quizzesTaken = [];
    for (let i = 0; i < candidates.length; i++) {
      const quizTaken = candidates[i].quizTaken;
      if (quizTaken.length > 0) {
        quizzesTaken.push(candidates[i]);
      }
    }
    res.status(200).json({ success: true, candidates: quizzesTaken });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single candidate
// @route   GET /candidate/:id
// @access  Private
exports.getCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return next(new ErrorResponse(`Cannot get candidate`, 404));
    }
    res.status(200).json({ success: true, candidate: candidate });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new candidate
// @route   POST /candidate/:quizID
// @access  Private
exports.createCandidate = async (req, res, next) => {
  const { name, email } = req.body;
  const employer = req.employer.id;
  const employerName = req.employer.name;
  const quizId = req.params.quizID;
  try {
    const candidate = await Candidate.create({
      name,
      email,
      employer,
      quizAssigned: [{ quizId }],
    });

    // get quiz from database
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return next(new ErrorResponse(`Cannot get quiz`, 404));
    }
    const accessKey = quiz.accessKey;
    const quizUrl = `${req.protocol}://localhost:3000/take-quiz/${candidate._id}/${quizId}`;
    const message = `
      <h2>You have been assigned the quiz, ${quiz.title}, by ${employerName}.</h2>
      <h3>Please go to this link to take your quiz.</h3>
      <a href=${quizUrl} clicktracking=off>${quizUrl}</a>
      <h3><i>Access Key:</i> <strong>${accessKey}</strong></h3>
    `;

    try {
      await sendEmail({
        to: email,
        subject: "Quiz Assigned",
        text: message,
      });
      res
        .status(201)
        .json({ success: true, data: candidate, message: "Email Sent" });
    } catch (error) {
      await Candidate.findByIdAndDelete(candidate._id);
      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update candidate
// @route   PUT /candidate/:id
// @access  Private
exports.updateCandidate = async (req, res, next) => {
  const { name, email, quizzesAssigned } = req.body;
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        quizzesAssigned,
      },
      { new: true, runValidators: true }
    );
    if (!candidate) {
      return next(new ErrorResponse(`Cannot update candidate`, 404));
    }
    res.status(200).json({ success: true, data: candidate });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete candidate
// @route   DELETE /candidate/:id
// @access  Private
exports.deleteCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) {
      return next(new ErrorResponse(`Cannot delete candidate`, 404));
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
