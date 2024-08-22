import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Authentication from './components/Authentication';
import CountdownHome from './components/CountdownHome';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route
          path="/countdown-home/*"
          element={
            <ProtectedRoute>
              <CountdownHome />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
