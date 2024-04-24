import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', enrollmentNumber: '', class: '' });
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3007/students/');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const createStudent = async () => {
    try {
      await axios.post('http://localhost:3007/students', newStudent);
      setNewStudent({ name: '', enrollmentNumber: '', class: '' });
      getStudents();
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const updateStudent = async () => {
    try {
      const { _id, name, enrollmentNumber, class: className } = selectedStudent;
      await axios.put(`http://localhost:3007/students/${_id}`, { name, enrollmentNumber, class: className });
      getStudents();
      setSelectedStudent(null);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:3007/students/${id}`);
      getStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const selectStudentForEdit = (student) => {
    setSelectedStudent(student);
    setNewStudent({ name: student.name, enrollmentNumber: student.enrollmentNumber, class: student.class });
  };

  return (
    <div>
      <h2 style={{ color: 'white' }}>Student Management</h2>
      <div>
        <h3 style={{ color: 'white' }}>Add Student</h3>
        <input
          type="text"
          placeholder="Name"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Enrollment Number"
          value={newStudent.enrollmentNumber}
          onChange={(e) => setNewStudent({ ...newStudent, enrollmentNumber: e.target.value })}
        />
        <input
          type="text"
          placeholder="Class"
          value={newStudent.class}
          onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
        />
        <button style={{ backgroundColor: 'green', color: 'white' }} onClick={selectedStudent ? updateStudent : createStudent}>
          {selectedStudent ? 'Update' : 'Add'}
        </button>
        {selectedStudent && (
          <button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => { setSelectedStudent(null); setNewStudent({ name: '', enrollmentNumber: '', class: '' }); }}>
            Cancel
          </button>
        )}
      </div>
      <h3 style={{ color: 'white' }}>Students List</h3>
      <ul style={{ color: 'white' }}>
        {students.map((student) => (
          <li key={student._id}>
            {student.name} - {student.enrollmentNumber} - {student.class}
            <button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => selectStudentForEdit(student)}>Edit</button>
            <button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => deleteStudent(student._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentManagement;
