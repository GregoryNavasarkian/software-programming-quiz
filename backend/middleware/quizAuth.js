const Candidate = require('../models/Candidate');
const Quiz = require('../models/Quiz');
const ErrorResponse = require('../utils/errorResponse');

exports.protect = async (req, res, next) => {
  let quizId = req.params.quizID;
  let candidateId;
  let accessKey;
  if (req.headers.authorization && req.headers.authorization.startsWith('Basic')) {
    candidateId = req.headers.authorization.split(' ')[1];
    accessKey = req.headers.authorization.split(' ')[2];
  }
  if (!email || !accessKey) {
    return next(new ErrorResponse('Not authorized to take this quiz', 401));
  }

  try {
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return next(new ErrorResponse('No candidate found with this id', 404));
    }
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return next(new ErrorResponse('No quiz found with this id', 404));
    }
    if (quiz.accessKey !== accessKey) {
      return next(new ErrorResponse('Not authorized to take this quiz', 401));
    }
    req.candidate = candidate;
    req.quiz = quiz;
    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized to take this quiz', 401));
  }
};