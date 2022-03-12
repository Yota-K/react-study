import React, { useState } from "react";
import Input from "./Input";
import TodoItem from "./TodoItem";

type Todo = {
  id: number;
  body: string;
  done: boolean;
};

const TodoApp: React.FC = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    if (!text) {
      alert("値が入力されていません");
      return;
    }

    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        body: text,
        done: false,
      },
    ]);

    setText("");
  };

  const toggleTodo = (todoId: number) => {
    const newItems = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.done = !todo.done;
      }
      return todo;
    });

    setTodos(newItems);
  };

  return (
    <div>
      <Input addTodo={addTodo} text={text} setText={setText} />
      {text}
      {todos && (
        <>
          {todos.map((e) => (
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
