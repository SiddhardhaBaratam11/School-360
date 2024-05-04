import React from 'react';
import { Link } from 'react-router-dom';

function AdminNavbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/admin/student">Student Management</Link>
        </li>
        <li>
          <Link to="/admin/staff">Staff Management</Link>
        </li>
        <li>
          <Link to="/admin/academic">Academic Management</Link>
        </li>
        <li>
          <Link to="/admin/grading">Grading Management</Link>
        </li>
        <li>
          <Link to="/admin/fee">Fee Management</Link>
        </li>
      </ul>
    </nav>
  );
}

export default AdminNavbar;
