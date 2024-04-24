const express = require('express');
const router = express.Router();
const academicController = require('../controllers/academicController');

// CRUD operations for academic
router.post('/', academicController.createAcademic);
router.get('/', academicController.getAllAcademics);
router.get('/:id', academicController.getAcademicById);
router.put('/:id', academicController.updateAcademic);
router.delete('/:id', academicController.deleteAcademic);

module.exports = router;
