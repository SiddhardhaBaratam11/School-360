import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AcademicManagement = () => {
  const [academicInfo, setAcademicInfo] = useState([]);
  const [newAcademicInfo, setNewAcademicInfo] = useState({ class: '', schedule: '', syllabus: '' });
  const [selectedAcademicInfo, setSelectedAcademicInfo] = useState(null);

  useEffect(() => {
    getAcademicInfo();
  }, []);

  const getAcademicInfo = async () => {
    try {
      const response = await axios.get('http://localhost:3007/academic/');
      setAcademicInfo(response.data);
    } catch (error) {
      console.error('Error fetching academic information:', error);
    }
  };

  const createAcademicInfo = async () => {
    try {
      await axios.post('http://localhost:3007/academic', newAcademicInfo);
      setNewAcademicInfo({ class: '', schedule: '', syllabus: '' });
      getAcademicInfo();
    } catch (error) {
      console.error('Error creating academic information:', error);
    }
  };

  const updateAcademicInfo = async () => {
    try {
      const { _id, class: className, schedule, syllabus } = selectedAcademicInfo;
      await axios.put(`http://localhost:3007/academic/${_id}`, { class: className, schedule, syllabus });
      getAcademicInfo();
      setSelectedAcademicInfo(null);
    } catch (error) {
      console.error('Error updating academic information:', error);
    }
  };

  const deleteAcademicInfo = async (id) => {
    try {
      await axios.delete(`http://localhost:3007/academic/${id}`);
      getAcademicInfo();
    } catch (error) {
      console.error('Error deleting academic information:', error);
    }
  };

  const selectAcademicInfoForEdit = (academicInfo) => {
    setSelectedAcademicInfo(academicInfo);
    setNewAcademicInfo({ class: academicInfo.class, schedule: academicInfo.schedule, syllabus: academicInfo.syllabus });
  };

  return (
    <div>
      <h2 style={{ color: 'white' }}>Academic Information Management</h2>
      <div>
        <h3 style={{ color: 'white' }}>Add Academic Information</h3>
        <p style={{color:'white'}}>Class</p><input
          type="text"
          placeholder="Class"
          value={newAcademicInfo.class}
          onChange={(e) => setNewAcademicInfo({ ...newAcademicInfo, class: e.target.value })}
        />
        <br/>
        <p style={{color:'white'}}>Timings of the Class</p><input
          type="text"
          placeholder="Schedule"
          value={newAcademicInfo.schedule}
          onChange={(e) => setNewAcademicInfo({ ...newAcademicInfo, schedule: e.target.value })}
        />
        <br/>
        <p style={{color:'white'}}>Syllabus</p><input
          type="text"
          placeholder="Syllabus"
          value={newAcademicInfo.syllabus}
          onChange={(e) => setNewAcademicInfo({ ...newAcademicInfo, syllabus: e.target.value })}
        />
        <br/>
        <br/>
        <button style={{ backgroundColor: 'green', color: 'white' }} onClick={selectedAcademicInfo ? updateAcademicInfo : createAcademicInfo}>
          {selectedAcademicInfo ? 'Update' : 'Add Academics'}
        </button>
        {selectedAcademicInfo && (
          <button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => { setSelectedAcademicInfo(null); setNewAcademicInfo({ class: '', schedule: '', syllabus: '' }); }}>
            Cancel
          </button>
        )}
      </div>
      <h3 style={{ color: 'white' }}>Academic Information List</h3>
<table style={{ color: 'white', borderCollapse: 'collapse', width: '100%', border: '1px solid white' }}>
  <thead>
    <tr>
      <th style={{ border: '1px solid white', padding: '8px' }}>Class</th>
      <th style={{ border: '1px solid white', padding: '8px' }}>Schedule</th>
      <th style={{ border: '1px solid white', padding: '8px' }}>Syllabus</th>
      <th style={{ border: '1px solid white', padding: '8px' }}>Action</th>
    </tr>
  </thead>
  <tbody>
    {academicInfo.map((info) => (
      <tr key={info._id} style={{ border: '1px solid white' }}>
        <td style={{ border: '1px solid white', padding: '8px' }}>{info.class}</td>
        <td style={{ border: '1px solid white', padding: '8px' }}>{info.schedule}</td>
        <td style={{ border: '1px solid white', padding: '8px' }}>{info.syllabus}</td>
        <td style={{ border: '1px solid white', padding: '8px' }}>
          <button style={{ backgroundColor: 'green', color: 'white', marginRight: 5 }} onClick={() => selectAcademicInfoForEdit(info)}>Edit</button> &nbsp;
          <button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => deleteAcademicInfo(info._id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default AcademicManagement;
