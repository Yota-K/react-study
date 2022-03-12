import React from "react";

type Props = {
  id: number;
  body: string;
  done: boolean;
  toggleTodo: (todoId: number) => void;
};

const TodoItem: React.FC<Props> = ({ id, body, done, toggleTodo }) => {
  return (
    <div className="todo-item" onClick={() => toggleTodo(id)}>
      <p className="todo-item__id">{id}</p>
      <p>{body}</p>
      {done && <span className="todo-item__done">✔︎</span>}
    </div>
  );
};

export default TodoItem;
