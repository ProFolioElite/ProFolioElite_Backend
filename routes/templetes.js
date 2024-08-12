// routes/templates.js

const express = require('express');
const Template = require('../models/Template');
const router = express.Router();

// Save the template data to the database
router.post('/create-template', async (req, res) => {
  const { name, profession, description, image, component } = req.body;

  try {
    const newTemplate = new Template({ name, profession, description, image, component });
    await newTemplate.save();
    res.status(201).json(newTemplate);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
