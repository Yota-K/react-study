type Todo = {
  id: number;
  body: string;
  done: boolean;
};

export type State = {
  text: string;
  todos: Todo[];
};

export const initialState: State = {
  text: "",
  todos: [],
};

export type Action =
  | { type: "change"; text: string }
  | { type: "add" }
  | { type: "toggleTodo"; id: number };

export const reducer = (state: State, action: Action): State => {
  if (action.type === "change") {
    return {
      ...state,
      text: action.text,
    };
  } else if (action.type === "add") {
    return {
      ...state,
      text: "",
      todos: [
        ...state.todos,
        {
          id: state.todos.length + 1,
          body: state.text,
          done: false,
        },
      ],
    };
  } else if (action.type === "toggleTodo") {
    // Stateを直接書き換えることはできないので、Stateのディープコピーを作る
    const copyTodos = state.todos.map((todo) => ({ ...todo }));

    const newTodos = copyTodos.map((todo) => {
      if (todo.id === action.id) {
        todo.done = !todo.done;
      }
      return todo;
    });
    console.log(newTodos);

    return {
      ...state,
      todos: newTodos,
    };
  } else {
    return state;
  }
};
