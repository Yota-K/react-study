import React, { useReducer } from "react";
import TodoApp from "../components/TodoUsingUseStateSample/TodoApp";
import { default as TodoAppSample2 } from "../components/TodoUsingUseReducerUseContext/TodoApp";
import { TodoContext } from "../lib/reducer/todo/context";
import { initialState, reducer } from "../lib/reducer/todo/reducer";

const UseReducerAndUseContextPage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="container">
      <h2>useReducer, useContextについて</h2>
      <div>
        <h3>useStateしか使わないバージョン</h3>
        <TodoApp />
      </div>
      <div>
        <h3>useReducerとuseContextを使ったバージョン</h3>
        <TodoContext.Provider value={{ state, dispatch }}>
          <TodoAppSample2 />
        </TodoContext.Provider>
      </div>
    </div>
  );
};

export default UseReducerAndUseContextPage;
