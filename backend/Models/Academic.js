const mongoose = require('mongoose');

const academicSchema = new mongoose.Schema({
  class: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  syllabus: {
    type: String,
    required: true,
  },
  // Add more fields as needed
});

module.exports = mongoose.model('Academic', academicSchema);
