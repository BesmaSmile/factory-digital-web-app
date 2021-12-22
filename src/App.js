import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from 'components/Navbar/Navbar';
import Login from 'components/Login/Login';
import Payments from 'components/Payments/Payments';
import Home from 'components/Home/Home';

import './App.scss';

const App = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Router>
      {user && <Navbar />}
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={user ? <h1>Hello {user.firstname} {user.lastname}</h1>
              : <Navigate to="/login" />}
          />
          {!user && (
            <Route path="/login" element={<Login />} />
          )}
          {
            user && (
              <>
                <Route path="/home" element={<Home />} />
                <Route path="/payments" element={<Payments />} />
              </>
            )
          }
        </Routes>
      </div>
    </Router>
  );
};

export default App;
