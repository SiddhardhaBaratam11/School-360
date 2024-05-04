import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GradingManagement = () => {
  const [gradings, setGradings] = useState([]);
  const [newGrading, setNewGrading] = useState({ studentId: '', grade: '' });
  const [selectedGrading, setSelectedGrading] = useState(null);

  useEffect(() => {
    getGradings();
  }, []);

  const getGradings = async () => {
    try {
      const response = await axios.get('http://localhost:3007/grading/');
      setGradings(response.data);
    } catch (error) {
      console.error('Error fetching gradings:', error);
    }
  };

  const createGrading = async () => {
    try {
      await axios.post('http://localhost:3007/grading', newGrading);
      setNewGrading({ studentId: '', grade: '' });
      getGradings();
      toast.success("Grades added successfully!")
    } catch (error) {
      console.error('Error creating grading:', error);
    }
  };

  const updateGrading = async () => {
    try {
      const { _id, studentId, grade } = selectedGrading;
      await axios.put(`http://localhost:3007/grading/${_id}`, { studentId, grade });
      getGradings();
      toast.success("Grades updated successfully!")

      setSelectedGrading(null);
    } catch (error) {
      console.error('Error updating grading:', error);
    }
  };

  const deleteGrading = async (id) => {
    try {
      await axios.delete(`http://localhost:3007/grading/${id}`);
      getGradings();
      toast.success("Grades deleted successfully!")

    } catch (error) {
      console.error('Error deleting grading:', error);
    }
  };

  const selectGradingForEdit = (grading) => {
    setSelectedGrading(grading);
    setNewGrading({ studentId: grading.studentId, grade: grading.grade });
  };

  return (
    <div>
      <h2 style={{ color: 'white' }}>Grading Management</h2>
      <div>
        <h3 style={{ color: 'white' }}>Add Grading</h3>
        <p style={{color:'white'}}>Student ID</p><input
          type="text"
          placeholder="Student ID"
          value={newGrading.studentId}
          onChange={(e) => setNewGrading({ ...newGrading, studentId: e.target.value })}
        />
        <br/>
        <p style={{color:'white'}}>Grade</p><input
          type="text"
          placeholder="Grade"
          value={newGrading.grade}
          onChange={(e) => setNewGrading({ ...newGrading, grade: e.target.value })}
        />
        <br/>
        <br/>
        <button style={{ backgroundColor: 'green', color: 'white' }} onClick={selectedGrading ? updateGrading : createGrading}>
          {selectedGrading ? 'Update' : 'Add Grade'}
        </button>
        {selectedGrading && (
          <button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => { setSelectedGrading(null); setNewGrading({ studentId: '', grade: '' }); }}>
            Cancel
          </button>
        )}
      </div>
      <h3 style={{ color: 'white' }}>Gradings List</h3>
<table style={{ color: 'white', borderCollapse: 'collapse', width: '100%', border: '1px solid white' }}>
  <thead>
    <tr>
      <th style={{ border: '1px solid white', padding: '8px' }}>Student ID</th>
      <th style={{ border: '1px solid white', padding: '8px' }}>Grade</th>
      <th style={{ border: '1px solid white', padding: '8px' }}>Action</th>
    </tr>
  </thead>
  <tbody>
    {gradings.map((grading) => (
      <tr key={grading._id} style={{ border: '1px solid white' }}>
        <td style={{ border: '1px solid white', padding: '8px' }}>{grading.studentId}</td>
        <td style={{ border: '1px solid white', padding: '8px' }}>{grading.grade}</td>
        <td style={{ border: '1px solid white', padding: '8px' }}>
          <button style={{ backgroundColor: 'green', color: 'white', marginRight: 5 }} onClick={() => selectGradingForEdit(grading)}>Edit</button> &nbsp;
          <button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => deleteGrading(grading._id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default GradingManagement;
