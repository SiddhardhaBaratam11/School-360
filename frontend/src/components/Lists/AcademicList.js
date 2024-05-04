import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AcademicList = () => {
  const [academics, setAcademics] = useState([]);

  const fetchAcademics = async () => {
    try {
      const response = await axios.get('http://localhost:3007/academic');
      setAcademics(response.data);
      toast.success("Academics fetched successfully!");

    } catch (error) {
      console.error('Error fetching academics:', error);
    }
  };

  return (
    <div>
      <div>
        <h4 style={{ color: 'white' }}>Academics</h4>
        <button style={{ backgroundColor: 'green', color: 'white' }} onClick={fetchAcademics}>Fetch Academics</button>
        <h3 style={{ color: 'white' }}>Academics List</h3>
<table style={{ color: 'white', borderCollapse: 'collapse', width: '100%', border: '1px solid white' }}>
  <thead>
    <tr>
      <th style={{ border: '1px solid white', padding: '8px' }}>Class</th>
      <th style={{ border: '1px solid white', padding: '8px' }}>Schedule</th>
      <th style={{ border: '1px solid white', padding: '8px' }}>Syllabus</th>
    </tr>
  </thead>
  <tbody>
    {academics.map((academic) => (
      <tr key={academic.id} style={{ border: '1px solid white' }}>
        <td style={{ border: '1px solid white', padding: '8px' }}>{academic.class}</td>
        <td style={{ border: '1px solid white', padding: '8px' }}>{academic.schedule}</td>
        <td style={{ border: '1px solid white', padding: '8px' }}>{academic.syllabus}</td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  );
};

export default AcademicList;