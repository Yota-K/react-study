import React from 'react';
import { Link } from "react-router-dom";
import Nav from './Nav'

const Header: React.FC = () => {
  return (
  <header>
    <h1>
      <Link to="/">React勉強会第2回</Link>
    </h1>
    <div className="header-nav">
      <Nav />
    </div>
  </header>
  );
};

export default Header;
