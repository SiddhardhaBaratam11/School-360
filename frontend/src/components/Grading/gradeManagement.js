import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    } catch (error) {
      console.error('Error creating grading:', error);
    }
  };

  const updateGrading = async () => {
    try {
      const { _id, studentId, grade } = selectedGrading;
      await axios.put(`http://localhost:3007/grading/${_id}`, { studentId, grade });
      getGradings();
      setSelectedGrading(null);
    } catch (error) {
      console.error('Error updating grading:', error);
    }
  };

  const deleteGrading = async (id) => {
    try {
      await axios.delete(`http://localhost:3007/grading/${id}`);
      getGradings();
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
        <input
          type="text"
          placeholder="Student ID"
          value={newGrading.studentId}
          onChange={(e) => setNewGrading({ ...newGrading, studentId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Grade"
          value={newGrading.grade}
          onChange={(e) => setNewGrading({ ...newGrading, grade: e.target.value })}
        />
        <button style={{ backgroundColor: 'green', color: 'white' }} onClick={selectedGrading ? updateGrading : createGrading}>
          {selectedGrading ? 'Update' : 'Add'}
        </button>
        {selectedGrading && (
          <button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => { setSelectedGrading(null); setNewGrading({ studentId: '', grade: '' }); }}>
            Cancel
          </button>
        )}
      </div>
      <h3 style={{ color: 'white' }}>Gradings List</h3>
      <ul style={{ color: 'white' }}>
        {gradings.map((grading) => (
          <li key={grading._id}>
            {grading.studentId} - {grading.grade}
            <button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => selectGradingForEdit(grading)}>Edit</button>
            <button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => deleteGrading(grading._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GradingManagement;
