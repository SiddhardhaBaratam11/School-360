    const express = require('express');
    const router = express.Router();
    const studentController = require('../controllers/studentController');

    // CRUD operations for students
    router.post('/', studentController.createStudent);
    router.get('/', studentController.getAllStudents);
    router.get('/:id', studentController.getStudentById);
    router.put('/:id', studentController.updateStudent);
    router.delete('/:id', studentController.deleteStudent);

    module.exports = router;
