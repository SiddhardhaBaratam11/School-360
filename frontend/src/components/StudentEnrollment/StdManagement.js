import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
      toast.success("Student added successfully!")
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const updateStudent = async () => {
    try {
      const { _id, name, enrollmentNumber, class: className } = selectedStudent;
      await axios.put(`http://localhost:3007/students/${_id}`, { name, enrollmentNumber, class: className });
      getStudents();
      toast.success("Student updated successfully!")

      setSelectedStudent(null);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:3007/students/${id}`);
      getStudents();
      toast.success("Student deleted successfully!")

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
        <p style={{  color: 'white' }}>Student Name</p><input
          type="text"
          placeholder="Name"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
        />
        <br/>
        <p style={{  color: 'white' }}>Enrollment Number</p>
        <input
          type="text"
          placeholder="Enrollment Number"
          value={newStudent.enrollmentNumber}
          onChange={(e) => setNewStudent({ ...newStudent, enrollmentNumber: e.target.value })}
        />
        <br/>
        <p style={{  color: 'white' }}>Class</p>
        <input
          type="text"
          placeholder="Class"
          value={newStudent.class}
          onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
        />
        <br/>
        <br/>
        <button style={{ backgroundColor: 'green', color: 'white' }} onClick={selectedStudent ? updateStudent : createStudent}>
          {selectedStudent ? 'Update' : 'Add Student'}
        </button>
        {selectedStudent && (
          <button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => { setSelectedStudent(null); setNewStudent({ name: '', enrollmentNumber: '', class: '' }); }}>
            Cancel
          </button>
        )}
      </div>
      <h3 style={{ color: 'white' }}>Students List</h3>
<table style={{ color: 'white', borderCollapse: 'collapse', width: '100%', border: '1px solid white' }}>
  <thead>
    <tr>
      <th style={{ border: '1px solid white', padding: '8px' }}>Name</th>
      <th style={{ border: '1px solid white', padding: '8px' }}>Enrollment Number</th>
      <th style={{ border: '1px solid white', padding: '8px' }}>Class</th>
      <th style={{ border: '1px solid white', padding: '8px' }}>Action</th>
    </tr>
  </thead>
  <tbody>
    {students.map((student) => (
      <tr key={student._id} style={{ border: '1px solid white' }}>
        <td style={{ border: '1px solid white', padding: '8px' }}>{student.name}</td>
        <td style={{ border: '1px solid white', padding: '8px' }}>{student.enrollmentNumber}</td>
        <td style={{ border: '1px solid white', padding: '8px' }}>{student.class}</td>
        <td style={{ border: '1px solid white', padding: '8px' }}>
          <button style={{ backgroundColor: 'green', color: 'white', marginRight: 5 }} onClick={() => selectStudentForEdit(student)}>Edit</button> &nbsp;
          <button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => deleteStudent(student._id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default StudentManagement;
