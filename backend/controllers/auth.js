const Employer = require('../models/Employer');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Register Employer
// @route   POST /auth/register
// @access  Public
exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const employer = await Employer.create({
      name,
      email,
      password
    });

    sendToken(employer, 201, res);

  } catch (error) {
    next(error);
  }
}

// @desc    Login Employer
// @route   POST /auth/login
// @access  Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    const employer = await Employer.findOne({ email }).select("+password");
    if (!employer) {
      return next(new ErrorResponse("Invalid credentials", 404));
    }
    const isMatch = await employer.matchPasswords(password);
    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendToken(employer, 200, res);
  
  } catch (error) {
    return next(error);
  }
}

exports.forgotPassword = (req, res, next) => {
  res.send("Forgot Password Route");
}

exports.resetPassword = (req, res, next) => {
  res.send("Reset Password Route");
}

const sendToken = (employer, statusCode, res) => {
  const token = employer.getSignedJwtToken();
  return res.status(statusCode).json({ success: true, token });
}