import React from 'react';
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <>
      <h1>もくじ</h1>
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
    </>
  );
};

export default Home;
