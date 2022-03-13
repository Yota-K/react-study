import React, { useContext } from "react";
import Input from "./Input";
import TodoItem from "./TodoItem";
import { TodoContext } from "../../lib/reducer/todo/context";

const TodoApp: React.FC = () => {
  const { state, dispatch } = useContext(TodoContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "change",
      text: e.target.value,
    });
  };

  const addTodo = () => {
    if (!state.text) {
      alert("値が入力されていません");
      return;
    }

    dispatch({
      type: "add",
    });
  };

  const toggleTodo = (id: number) => {
    dispatch({
      type: "toggleTodo",
      id,
    });
  };

  return (
    <div>
      <Input text={state.text} handleChange={handleChange} addTodo={addTodo} />
      {state.text}
      {state.todos && (
        <>
          {state.todos.map((e) => (
            <TodoItem
              key={e.id}
              id={e.id}
              body={e.body}
              done={e.done}
              toggleTodo={toggleTodo}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default TodoApp;
