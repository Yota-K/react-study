import React from "react";

type Props = {
  text: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addTodo: () => void;
};

const Input: React.FC<Props> = ({ text, handleChange, addTodo }) => {
  return (
    <div>
      <input
        id="todo"
        name="todo"
        type="text"
        autoComplete="off"
        value={text}
        onChange={handleChange}
        style={{ marginRight: "10px" }}
      />
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
};

export default Input;
