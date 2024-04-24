const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  studentId: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  // Add more fields as needed
});

module.exports = mongoose.model('Fee', feeSchema);
