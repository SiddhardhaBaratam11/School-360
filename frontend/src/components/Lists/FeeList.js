import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FeeList = () => {
  const [fees, setFees] = useState([]);
  

  const fetchFees = async () => {
    try {
      const response = await axios.get('http://localhost:3007/fee');
      setFees(response.data);
      toast.success("Fees fetched successfully!");
    } catch (error) {
      console.error('Error fetching fees:', error);
    }
  };

  return (
    <div>
      <div>
        <h4 style={{ color: 'white' }}>Fees</h4>
        <button style={{ backgroundColor: 'green', color: 'white' }}  onClick={fetchFees}>Fetch Fees</button> 
        
        <h3 style={{ color: 'white' }}>Fees List</h3>
<table style={{ color: 'white', borderCollapse: 'collapse', width: '100%', border: '1px solid white' }}>
  <thead>
    <tr>
      <th style={{ border: '1px solid white', padding: '8px' }}>Student ID</th>
      <th style={{ border: '1px solid white', padding: '8px' }}>Amount</th>
    </tr>
  </thead>
  <tbody>
    {fees.map((fee) => (
      <tr key={fee.id} style={{ border: '1px solid white' }}>
        <td style={{ border: '1px solid white', padding: '8px' }}>{fee.studentId}</td>
        <td style={{ border: '1px solid white', padding: '8px' }}>{fee.amount}</td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  );
};

export default FeeList;