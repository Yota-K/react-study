import { createContext, Dispatch } from "react";
import { State, Action } from "./reducer";

export const TodoContext = createContext(
  {} as { state: State; dispatch: Dispatch<Action> }
);
