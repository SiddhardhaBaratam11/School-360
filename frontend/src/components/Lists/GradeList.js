import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GradeList = () => {
  const [grades, setGrades] = useState([]);
  
  const fetchGrades = async () => {
    try {
      const response = await axios.get('http://localhost:3007/grading');
      setGrades(response.data);
      toast.success("Grades fetched successfully!");

    } catch (error) {
      console.error('Error fetching grades:', error);
    }
  };

  return (
    <div>
      <div>
        <h4 style={{ color: 'white' }}>Grades</h4>
        <button style={{ backgroundColor: 'green', color: 'white' }}  onClick={fetchGrades}>Fetch Grades</button>
        <h3 style={{ color: 'white' }}>Grades List</h3>
<table style={{ color: 'white', borderCollapse: 'collapse', width: '100%', border: '1px solid white' }}>
  <thead>
    <tr>
      <th style={{ border: '1px solid white', padding: '8px' }}>Student ID</th>
      <th style={{ border: '1px solid white', padding: '8px' }}>Grade</th>
    </tr>
  </thead>
  <tbody>
    {grades.map((grade) => (
      <tr key={grade.id} style={{ border: '1px solid white' }}>
        <td style={{ border: '1px solid white', padding: '8px' }}>{grade.studentId}</td>
        <td style={{ border: '1px solid white', padding: '8px' }}>{grade.grade}</td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  );
};

export default GradeList;