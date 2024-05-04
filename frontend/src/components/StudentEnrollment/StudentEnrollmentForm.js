import React, { useState } from 'react';
import axios from 'axios';

function StudentEnrollmentForm() {
  const [formData, setFormData] = useState({
    name: '',
    enrollmentNumber: '',
    class: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3007/students', formData);
      console.log(response.data);
      // Add any additional logic after successful submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h2>Student Enrollment Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Enrollment Number:</label>
          <input type="text" name="enrollmentNumber" value={formData.enrollmentNumber} onChange={handleChange} />
        </div>
        <div>
          <label>Class:</label>
          <input type="text" name="class" value={formData.class} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default StudentEnrollmentForm;
