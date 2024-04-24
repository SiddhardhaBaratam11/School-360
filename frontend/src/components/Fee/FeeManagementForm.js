import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    } catch (error) {
      console.error('Error creating fee:', error);
    }
  };

  const updateFee = async () => {
    try {
      const { _id, studentId, amount } = selectedFee;
      await axios.put(`http://localhost:3007/fee/${_id}`, { studentId, amount });
      getFees();
      setSelectedFee(null);
    } catch (error) {
      console.error('Error updating fee:', error);
    }
  };

  const deleteFee = async (id) => {
    try {
      await axios.delete(`http://localhost:3007/fee/${id}`);
      getFees();
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
        <input
          type="text"
          placeholder="Student ID"
          value={newFee.studentId}
          onChange={(e) => setNewFee({ ...newFee, studentId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Amount"
          value={newFee.amount}
          onChange={(e) => setNewFee({ ...newFee, amount: e.target.value })}
        />
        <button style={{ backgroundColor: 'green', color: 'white' }} onClick={selectedFee ? updateFee : createFee}>
          {selectedFee ? 'Update' : 'Add'}
        </button>
        {selectedFee && (
          <button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => { setSelectedFee(null); setNewFee({ studentId: '', amount: '' }); }}>
            Cancel
          </button>
        )}
      </div>
      <h3 style={{ color: 'white' }}>Fees List</h3>
      <ul style={{ color: 'white' }}>
        {fees.map((fee) => (
          <li key={fee._id}>
            {fee.studentId} - {fee.amount}
            <button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => selectFeeForEdit(fee)}>Edit</button>
            <button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => deleteFee(fee._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeeManagement;
