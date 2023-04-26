const Quiz = require('../models/Quiz.js');
const ErrorResponse = require('../utils/errorResponse.js');

// @desc    Get all quizzes
// @route   GET /quiz
// @access  Private
exports.getQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find({ createdBy: req.employer.id});
    if (!quizzes) {
      return next(new ErrorResponse(`No quizzes found`, 404));
    }
    res.status(200).json({ success: true, quizzes: quizzes });
  } catch (error) {
    next(error);
  }
}

// @desc    Get single quiz
// @route   GET /quiz/:id
// @access  Private
exports.getQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return next(new ErrorResponse(`Cannot get quiz`, 404));
    }
    res.status(200).json({ success: true, quiz: quiz });
  } catch (error) {
    next(error);
  }
}

// @desc    Create new quiz
// @route   POST /quiz
// @access  Private
exports.createQuiz = async (req, res, next) => {
  const { title, questions, timeLimit } = req.body;
  const createdBy = req.employer.id;
  try {
    await Quiz.create({
      title,
      createdBy,
      questions,
      timeLimit
    });
    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
}

// @desc    Update quiz
// @route   PUT /quiz/:id
// @access  Private
exports.updateQuiz = async (req, res, next) => {
  const { title, questions, timeLimit } = req.body;
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return next(new ErrorResponse(`Cannot update quiz`, 404));
    }
    await Quiz.findByIdAndUpdate(req.params.id, {
      title,
      questions,
      timeLimit
    });
    const updatedQuiz = await Quiz.findById(req.params.id);
    res.status(200).json({ success: true, quiz: updatedQuiz });
  } catch (error) {
    next(error);
  }
}

// @desc    Delete quiz
// @route   DELETE /quiz/:id
// @access  Private
exports.deleteQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return next(new ErrorResponse(`Cannot delete quiz`, 404));
    }
    await Quiz.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
}
