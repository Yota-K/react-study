import React from "react";
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
          <Link to="/use-context-use-reducer">
            useContext・useReducerについて
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
