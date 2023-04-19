const Employer = require('../models/Employer');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

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

// @desc    Send email to reset password
// @route   POST /auth/forgotpassword
// @access  Public
exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const employer = await Employer.findOne({ email });
    if (!employer) {
      return next(new ErrorResponse("Email could not be sent", 404));
    }
    const resetToken = employer.getResetPasswordToken();
    await employer.save();

    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please go to this link to reset your password</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: employer.email,
        subject: "Password Reset Request",
        text: message
      });
      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (error) {
      employer.getResetPasswordToken = undefined;
      employer.getResetPasswordExpire = undefined;
      await employer.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }

  } catch (error) {
    next(error);
  }
}

exports.resetPassword = (req, res, next) => {
  res.send("Reset Password Route");
}

const sendToken = (employer, statusCode, res) => {
  const token = employer.getSignedJwtToken();
  return res.status(statusCode).json({ success: true, token });
}