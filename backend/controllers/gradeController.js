const Grading = require('../Models/Grade');

// Create a new grading record
exports.createGrading = async (req, res) => {
  try {
    const grading = new Grading(req.body);
    await grading.save();
    res.status(201).send(grading);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all grading records
exports.getAllGradings = async (req, res) => {
  try {
    const gradings = await Grading.find();
    res.status(200).send(gradings);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get a single grading record by ID
exports.getGradingById = async (req, res) => {
  try {
    const grading = await Grading.findById(req.params.id);
    if (!grading) {
      return res.status(404).send({ message: 'Grading record not found' });
    }
    res.status(200).send(grading);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update a grading record by ID
exports.updateGrading = async (req, res) => {
  try {
    const grading = await Grading.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!grading) {
      return res.status(404).send({ message: 'Grading record not found' });
    }
    res.status(200).send(grading);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a grading record by ID
exports.deleteGrading = async (req, res) => {
  try {
    const grading = await Grading.findByIdAndDelete(req.params.id);
    if (!grading) {
      return res.status(404).send({ message: 'Grading record not found' });
    }
    res.status(200).send({ message: 'Grading record deleted successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
};
