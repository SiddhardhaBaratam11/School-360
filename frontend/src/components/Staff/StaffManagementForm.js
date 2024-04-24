import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [newStaff, setNewStaff] = useState({ name: '', staffId: '', role: '' });
  const [selectedStaff, setSelectedStaff] = useState(null);

  useEffect(() => {
    getStaff();
  }, []);

  const getStaff = async () => {
    try {
      const response = await axios.get('http://localhost:3007/staff/');
      setStaff(response.data);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  const createStaff = async () => {
    try {
      await axios.post('http://localhost:3007/staff', newStaff);
      setNewStaff({ name: '', staffId: '', role: '' });
      getStaff();
    } catch (error) {
      console.error('Error creating staff:', error);
    }
  };

  const updateStaff = async () => {
    try {
      const { _id, name, staffId, role } = selectedStaff;
      await axios.put(`http://localhost:3007/staff/${_id}`, { name, staffId, role });
      getStaff();
      setSelectedStaff(null);
    } catch (error) {
      console.error('Error updating staff:', error);
    }
  };

  const deleteStaff = async (id) => {
    try {
      await axios.delete(`http://localhost:3007/staff/${id}`);
      getStaff();
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  const selectStaffForEdit = (staff) => {
    setSelectedStaff(staff);
    setNewStaff({ name: staff.name, staffId: staff.staffId, role: staff.role });
  };

  return (
    <div>
      <h2 style={{ color: 'white' }}>Staff Management</h2>
      <div>
        <h3 style={{ color: 'white' }}>Add Staff</h3>
        <input
          type="text"
          placeholder="Name"
          value={newStaff.name}
          onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Staff ID"
          value={newStaff.staffId}
          onChange={(e) => setNewStaff({ ...newStaff, staffId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Role"
          value={newStaff.role}
          onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
        />
        <button style={{ backgroundColor: 'green', color: 'white' }} onClick={selectedStaff ? updateStaff : createStaff}>
          {selectedStaff ? 'Update' : 'Add'}
        </button>
        {selectedStaff && (
          <button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => { setSelectedStaff(null); setNewStaff({ name: '', staffId: '', role: '' }); }}>
            Cancel
          </button>
        )}
      </div>
      <h3 style={{ color: 'white' }}>Staff List</h3>
      <ul style={{ color: 'white' }}>
        {staff.map((staff) => (
          <li key={staff._id}>
            {staff.name} - {staff.staffId} - {staff.role}
            <button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => selectStaffForEdit(staff)}>Edit</button>
            <button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => deleteStaff(staff._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StaffManagement;
