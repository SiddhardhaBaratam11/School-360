import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      toast.success("Staff added successfully!")
    } catch (error) {
      console.error('Error creating staff:', error);
    }
  };

  const updateStaff = async () => {
    try {
      const { _id, name, staffId, role } = selectedStaff;
      await axios.put(`http://localhost:3007/staff/${_id}`, { name, staffId, role });
      getStaff();
      toast.success("Staff updated successfully!")

      setSelectedStaff(null);
    } catch (error) {
      console.error('Error updating staff:', error);
    }
  };

  const deleteStaff = async (id) => {
    try {
      await axios.delete(`http://localhost:3007/staff/${id}`);
      getStaff();
      toast.success("Staff deleted successfully!")

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
        <p style={{color:'white'}}>Name of the staff</p><input
          type="text"
          placeholder="Name"
          value={newStaff.name}
          onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
        />
        <br/>
        <p style={{color:'white'}}>Staff Id</p><input
          type="text"
          placeholder="Staff ID"
          value={newStaff.staffId}
          onChange={(e) => setNewStaff({ ...newStaff, staffId: e.target.value })}
        />
        <br/>

        <p style={{color:'white'}}>Role of the staff</p><input
          type="text"
          placeholder="Role"
          value={newStaff.role}
          onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
        />
        <br/>
        <br/>
        <button style={{ backgroundColor: 'green', color: 'white' }} onClick={selectedStaff ? updateStaff : createStaff}>
          {selectedStaff ? 'Update' : 'Add Staff'}
        </button>
        {selectedStaff && (
          <button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => { setSelectedStaff(null); setNewStaff({ name: '', staffId: '', role: '' }); }}>
            Cancel
          </button>
        )}
      </div>
      <h3 style={{ color: 'white' }}>Staff List</h3>
<table style={{ color: 'white', borderCollapse: 'collapse', width: '100%', border: '1px solid white' }}>
  <thead>
    <tr>
      <th style={{ border: '1px solid white', padding: '8px' }}>Name</th>
      <th style={{ border: '1px solid white', padding: '8px' }}>Staff ID</th>
      <th style={{ border: '1px solid white', padding: '8px' }}>Role</th>
      <th style={{ border: '1px solid white', padding: '8px' }}>Action</th>
    </tr>
  </thead>
  <tbody>
    {staff.map((staff) => (
      <tr key={staff._id} style={{ border: '1px solid white' }}>
        <td style={{ border: '1px solid white', padding: '8px' }}>{staff.name}</td>
        <td style={{ border: '1px solid white', padding: '8px' }}>{staff.staffId}</td>
        <td style={{ border: '1px solid white', padding: '8px' }}>{staff.role}</td>
        <td style={{ border: '1px solid white', padding: '8px' }}>
          <button style={{ backgroundColor: 'green', color: 'white', marginRight: 5 }} onClick={() => selectStaffForEdit(staff)}>Edit</button> &nbsp;
          <button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => deleteStaff(staff._id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default StaffManagement;
