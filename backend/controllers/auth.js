const crypto = require("crypto");
const Employer = require('../models/Employer');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

// @desc    Get current logged in Employer
// @route   GET /auth
// @access  Private
exports.getEmployer = async (req, res, next) => {
  res.status(200).json({
    success: true,
    employer: req.employer
  });
}

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

// @desc    Update Employer
// @route   PUT /auth/update
// @access  Private
exports.update = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const employer = await Employer.findByIdAndUpdate(req.employer.id, { name, email }, { new: true, runValidators: true });
    res.status(200).json({
      success: true
    });
  } catch (error) {
    next(error);
  }
};

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

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
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

// @desc    Reset password
// @route   PUT /auth/resetpassword/:resetToken
// @access  Public
exports.resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

  try {
    const employer = await Employer.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });
    if (!employer) {
      return next(new ErrorResponse("Invalid reset token", 400));
    }
    employer.password = req.body.password;
    employer.resetPasswordToken = undefined;
    employer.resetPasswordExpire = undefined;
    await employer.save();

    res.status(201).json({
      success: true,
      data: "Password reset success"
    });

  } catch (error) {
    next(error);
  }
}


// @desc  Send token response
const sendToken = (employer, statusCode, res) => {
  const token = employer.getSignedJwtToken();
  return res.status(statusCode).json({ success: true, token });
}
