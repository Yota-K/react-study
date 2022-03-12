import React from "react";

type Props = {
  addTodo: () => void;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

const Input: React.FC<Props> = ({ addTodo, text, setText }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <input
        id="todo"
        name="todo"
        type="text"
        autoComplete="off"
        onChange={handleChange}
        value={text}
        style={{ marginRight: "10px" }}
      />
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
};

export default Input;
