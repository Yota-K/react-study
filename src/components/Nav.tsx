import React from 'react';
import { Link } from "react-router-dom";

const Nav: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/use-state">useStateについて</Link>
        </li>
        <li>
          <Link to="/use-effect">useEffectについて</Link>
        </li>
        <li>
          <Link to="/use-reducer-and-use-context">useReducer, useContextについて</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
