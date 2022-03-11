import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import UseStatePage from './useStatePage';
import UseEffectPage from './useEffectPage';
import UseReducerAndUseContextPage from './useReduceerAndUseContextPage';

const RouteConfig: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='use-state' element={<UseStatePage />} />
      <Route path='use-effect' element={<UseEffectPage />} />
      <Route path='use-reducer-and-use-context' element={<UseReducerAndUseContextPage />} />
    </Routes>
  );
};

export default RouteConfig;
