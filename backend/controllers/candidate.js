const Candidate = require('../models/Candidate.js');
const Quiz = require('../models/Quiz.js');
const ErrorResponse = require('../utils/errorResponse.js');
const sendEmail = require('../utils/sendEmail.js');

// @desc    Get all candidates
// @route   GET /candidate/:quizID
// @access  Private
exports.getCandidates = async (req, res, next) => {
  try {
    const candidates = await Candidate.find({ employer: req.employer.id, quizAssigned: { $elemMatch: { quizId: req.params.quizID } } });
    if (!candidates) {
      return next(new ErrorResponse(`No candidates found`, 404));
    }
    res.status(200).json({ success: true, candidates: candidates });
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
  console.log(employerName);
  const quizId = req.params.quizID;
  try {
    const candidate = await Candidate.create({
      name,
      email,
      employer,
      quizAssigned: [{ quizId }]
    });

    // get quiz from database
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return next(new ErrorResponse(`Cannot get quiz`, 404));
    }
    const accessKey = quiz.accessKey;
    const quizUrl = `${req.protocol}://${req.get('host')}/take-quiz/${quizId}`;
    const message = `
      <h1>You have been assigned a quiz by ${employerName}.</h1>
      <p>Please go to this link to take your quiz.</p>
      <a href=${quizUrl} clicktracking=off>${quizUrl}</a>
      <h6>Access Key: <strong>${accessKey}</strong></h6>
    `;
    
    try {
      await sendEmail({
        to: email,
        subject: 'Quiz Assigned',
        text: message
      });
      res.status(201).json({ success: true, data: candidate, message: 'Email Sent' });
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
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, {
      name,
      email,
      quizzesAssigned
    }, { new: true, runValidators: true });
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
