import React from "react";
import TodoApp from "../components/TodoUsingUseStateSample/TodoApp";
import { default as TodoAppSample2 } from "../components/TodoUsingUseReducerUseContext/TodoApp";

const UseReducerAndUseContextPage: React.FC = () => {
  return (
    <div className="container">
      <h2>useReducer, useContextについて</h2>
      <div>
        <h3>useStateしか使わないバージョン</h3>
        <TodoApp />
      </div>
      <div>
        <h3>useReducerとuseContextを使ったバージョン</h3>
        <TodoAppSample2 />
      </div>
    </div>
  );
};

export default UseReducerAndUseContextPage;
