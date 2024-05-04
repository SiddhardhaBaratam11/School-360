const Staff = require('../Models/Staff');

// Create a new staff member
exports.createStaff = async (req, res) => {
  try {
    const staff = new Staff(req.body);
    await staff.save();
    res.status(201).send(staff);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all staff members
exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).send(staff);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get a single staff member by ID
exports.getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).send({ message: 'Staff member not found' });
    }
    res.status(200).send(staff);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update a staff member by ID
exports.updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!staff) {
      return res.status(404).send({ message: 'Staff member not found' });
    }
    res.status(200).send(staff);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a staff member by ID
exports.deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) {
      return res.status(404).send({ message: 'Staff member not found' });
    }
    res.status(200).send({ message: 'Staff member deleted successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
};
