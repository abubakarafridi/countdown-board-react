import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import AddTask from './AddTask';
import TaskHistory from './TaskHistory';
import './CountdownHome.css';

const CountdownLayout = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => alert('signed out Successfullly!'))
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className="bg-dark text-light p-4 vh-100"
        style={{ width: '250px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
        <ul className="nav flex-column">
          <li className="nav-item mb-3">
            <Link
              to="create-student"
              className="nav-link d-flex align-items-center text-light">
              <i className="bi bi-plus-circle fs-4 me-2"></i>
              <span className="fs-5">Add Task</span>
            </Link>
          </li>
          <li className="nav-item mb-3">
            <Link
              to="create-class"
              className="nav-link d-flex align-items-center text-light">
              <i className="bi bi-building fs-4 me-2"></i>
              <span className="fs-5">Task History</span>
            </Link>
          </li>
          <li className="nav-item">
            <button
              className="nav-link d-flex align-items-center text-danger bg-transparent border-0"
              onClick={handleSignOut}>
              <i className="bi bi-box-arrow-right fs-4 me-2"></i>
              <span className="fs-5">Sign Out</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div style={{ flexGrow: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

const CountdownHome = () => {
  return (
    <Routes>
      {/* Ensure this path has a trailing '*' */}
      <Route path="/" element={<CountdownLayout />}>
        <Route path="create-student" element={<AddTask />} />
        <Route path="create-class" element={<TaskHistory />} />
      </Route>
    </Routes>
  );
};

export default CountdownHome;
