const jwt = require('jsonwebtoken');
const Employer = require('../models/Employer');
const ErrorResponse = require('../utils/errorResponse');

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const employer = await Employer.findById(decoded.id);
    if (!employer) {
      return next(new ErrorResponse('No employer found with this id', 404));
    }
    req.employer = employer;
    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
}
