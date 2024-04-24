import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentFunctionality = () => {
  const [fees, setFees] = useState([]);
  const [grades, setGrades] = useState([]);
  const [academics, setAcademics] = useState([]);

  const fetchFees = async () => {
    try {
      const response = await axios.get('http://localhost:3007/fee');
      setFees(response.data);
    } catch (error) {
      console.error('Error fetching fees:', error);
    }
  };

  const fetchGrades = async () => {
    try {
      const response = await axios.get('http://localhost:3007/grading');
      setGrades(response.data);
    } catch (error) {
      console.error('Error fetching grades:', error);
    }
  };

  const fetchAcademics = async () => {
    try {
      const response = await axios.get('http://localhost:3007/academic');
      setAcademics(response.data);
    } catch (error) {
      console.error('Error fetching academics:', error);
    }
  };

  return (
    <div>
      <h3 style={{ color: 'white' }}>Student Functionality</h3>
      <div>
        <h4 style={{ color: 'white' }}>Fees</h4>
        <button style={{ backgroundColor: 'green', color: 'white' }}  onClick={fetchFees}>Fetch Fees</button>
        <ul style={{ color: 'white' }}>
          {fees.map((fee) => (
            <li key={fee.id}>{fee.studentId} - {fee.amount}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 style={{ color: 'white' }}>Grades</h4>
        <button style={{ backgroundColor: 'green', color: 'white' }}  onClick={fetchGrades}>Fetch Grades</button>
        <ul style={{ color: 'white' }}>
          {grades.map((grade) => (
            <li key={grade.id}>{grade.studentId} - {grade.grade}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 style={{ color: 'white' }}>Academics</h4>
        <button style={{ backgroundColor: 'green', color: 'white' }} onClick={fetchAcademics}>Fetch Academics</button>
        <ul style={{ color: 'white' }}>
          {academics.map((academic) => (
            <li key={academic.id}>{academic.class} - {academic.schedule} - {academic.syllabus}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentFunctionality;
