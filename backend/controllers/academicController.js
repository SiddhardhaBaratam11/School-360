const Academic = require('../Models/Academic');

// Create a new academic record
exports.createAcademic = async (req, res) => {
  try {
    const academic = new Academic(req.body);
    await academic.save();
    res.status(201).send(academic);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all academic records
exports.getAllAcademics = async (req, res) => {
  try {
    const academics = await Academic.find();
    res.status(200).send(academics);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get a single academic record by ID
exports.getAcademicById = async (req, res) => {
  try {
    const academic = await Academic.findById(req.params.id);
    if (!academic) {
      return res.status(404).send({ message: 'Academic record not found' });
    }
    res.status(200).send(academic);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update an academic record by ID
exports.updateAcademic = async (req, res) => {
  try {
    const academic = await Academic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!academic) {
      return res.status(404).send({ message: 'Academic record not found' });
    }
    res.status(200).send(academic);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete an academic record by ID
exports.deleteAcademic = async (req, res) => {
  try {
    const academic = await Academic.findByIdAndDelete(req.params.id);
    if (!academic) {
      return res.status(404).send({ message: 'Academic record not found' });
    }
    res.status(200).send({ message: 'Academic record deleted successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
};
