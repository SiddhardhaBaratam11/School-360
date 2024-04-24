const express = require('express');
const router = express.Router();
const gradingController = require('../controllers/gradeController');

// CRUD operations for grading
router.post('/', gradingController.createGrading);
router.get('/', gradingController.getAllGradings);
router.get('/:id', gradingController.getGradingById);
router.put('/:id', gradingController.updateGrading);
router.delete('/:id', gradingController.deleteGrading);

module.exports = router;
