import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FeeManagement = () => {
  const [fees, setFees] = useState([]);
  const [newFee, setNewFee] = useState({ studentId: '', amount: '' });
  const [selectedFee, setSelectedFee] = useState(null);

  useEffect(() => {
    getFees();
  }, []);

  const getFees = async () => {
    try {
      const response = await axios.get('http://localhost:3007/fee/');
      setFees(response.data);
    } catch (error) {
      console.error('Error fetching fees:', error);
    }
  };

  const createFee = async () => {
    try {
      await axios.post('http://localhost:3007/fee', newFee);
      setNewFee({ studentId: '', amount: '' });
      getFees();
      toast.success("Fees added successfully!")
    } catch (error) {
      console.error('Error creating fee:', error);
    }
  };

  const updateFee = async () => {
    try {
      const { _id, studentId, amount } = selectedFee;
      await axios.put(`http://localhost:3007/fee/${_id}`, { studentId, amount });
      getFees();
      toast.success("Fees updated successfully!")

      setSelectedFee(null);
    } catch (error) {
      console.error('Error updating fee:', error);
    }
  };

  const deleteFee = async (id) => {
    try {
      await axios.delete(`http://localhost:3007/fee/${id}`);
      getFees();
      toast.success("Fees deleted successfully!")

    } catch (error) {
      console.error('Error deleting fee:', error);
    }
  };

  const selectFeeForEdit = (fee) => {
    setSelectedFee(fee);
    setNewFee({ studentId: fee.studentId, amount: fee.amount });
  };

  return (
    <div>
      <h2 style={{ color: 'white' }}>Fee Management</h2>
      <div>
        <h3 style={{ color: 'white' }}>Add Fee</h3>
        <p style={{color:'white'}}>Student ID</p><input
          type="text"
          placeholder="Student ID"
          value={newFee.studentId}
          onChange={(e) => setNewFee({ ...newFee, studentId: e.target.value })}
        />
        <br/>
        <p style={{color:'white'}}>Fees</p><input
          type="text"
          placeholder="Amount"
          value={newFee.amount}
          onChange={(e) => setNewFee({ ...newFee, amount: e.target.value })}
        />
        <br/>
        <br/>
        <button style={{ backgroundColor: 'green', color: 'white' }} onClick={selectedFee ? updateFee : createFee}>
          {selectedFee ? 'Update' : 'Add Fees'}
        </button>
        {selectedFee && (
          <button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => { setSelectedFee(null); setNewFee({ studentId: '', amount: '' }); }}>
            Cancel
          </button>
        )}
      </div>
      <h3 style={{ color: 'white' }}>Fees List</h3>
<table style={{ color: 'white', borderCollapse: 'collapse', width: '100%', border: '1px solid white' }}>
  <thead>
    <tr>
      <th style={{ border: '1px solid white', padding: '8px' }}>Student ID</th>
      <th style={{ border: '1px solid white', padding: '8px' }}>Amount</th>
      <th style={{ border: '1px solid white', padding: '8px' }}>Action</th>
    </tr>
  </thead>
  <tbody>
    {fees.map((fee) => (
      <tr key={fee._id} style={{ border: '1px solid white' }}>
        <td style={{ border: '1px solid white', padding: '8px' }}>{fee.studentId}</td>
        <td style={{ border: '1px solid white', padding: '8px' }}>{fee.amount}</td>
        <td style={{ border: '1px solid white', padding: '8px' }}>
          <button style={{ backgroundColor: 'green', color: 'white', marginRight: 5 }} onClick={() => selectFeeForEdit(fee)}>Edit</button> &nbsp;
          <button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => deleteFee(fee._id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default FeeManagement;
