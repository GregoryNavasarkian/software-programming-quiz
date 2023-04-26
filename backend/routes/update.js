const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Employer = require('../models/Employer');

router.put( "/update", async (req, res) => {
    const currentEmail = req.body.currentEmail;
  
    try {
      const employer = await Employer.findOne({
        currentEmail
      });
      if (!employer) {
        return next(new ErrorResponse("Error", 400));
      }
      employer.email = req.body.email;
      employer.name = req.body.name;
      await employer.save();
  
      res.status(201).json({
        success: true,
        data: "Profile Update Successful"
      });
  
    } catch (error) {
      next(error);
    }
});

module.exports = router;