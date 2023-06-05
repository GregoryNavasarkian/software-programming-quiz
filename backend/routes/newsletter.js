const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

let Newsletter = require("../models/newsletter.model");

router.post("/", async (req, res) => {
  const newsletter = await Newsletter.findOne({
    email: req.body.email,
  });
  if (newsletter) {
    res.status(409).json({ message: "Email already exists" });
  } else {
    const newNewsletter = await Newsletter.create({
      email: req.body.email,
    });
    if (newNewsletter) {
      res.status(201).json({ message: "Email added to newsletter" });
    } else {
      res.status(400).json({ message: "Failed to add email" });
    }
  }
});

module.exports = router;
