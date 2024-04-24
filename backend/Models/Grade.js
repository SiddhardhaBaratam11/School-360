const mongoose = require('mongoose');

const gradingSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  // Add more fields as needed
});

module.exports = mongoose.model('Grading', gradingSchema);
