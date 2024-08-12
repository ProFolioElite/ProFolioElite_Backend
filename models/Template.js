// models/Template.js

const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  component: {
    type: String,
    required: true,
  },
});

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;
