import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <div className="container">
    <div className="row">
      <div className="col"><Link to="/home">Accueil</Link></div>
      <div className="col"><Link to="/payments">Payments</Link></div>
    </div>
  </div>
);

export default Navbar;
