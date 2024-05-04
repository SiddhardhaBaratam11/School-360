const Fee = require('../Models/Fee');

// Create a new fee record
exports.createFee = async (req, res) => {
  try {
    const fee = new Fee(req.body);
    await fee.save();
    res.status(201).send(fee);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all fee records
exports.getAllFees = async (req, res) => {
  try {
    const fees = await Fee.find();
    res.status(200).send(fees);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get a single fee record by ID
exports.getFeeById = async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id);
    if (!fee) {
      return res.status(404).send({ message: 'Fee record not found' });
    }
    res.status(200).send(fee);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update a fee record by ID
exports.updateFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!fee) {
      return res.status(404).send({ message: 'Fee record not found' });
    }
    res.status(200).send(fee);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a fee record by ID
exports.deleteFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndDelete(req.params.id);
    if (!fee) {
      return res.status(404).send({ message: 'Fee record not found' });
    }
    res.status(200).send({ message: 'Fee record deleted successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
};
