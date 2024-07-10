import { createContext } from "@lit/context";

export type Todo = {
  id: string;
  name: string;
  done: boolean;
};

export interface TodosDAO {
  list(): Promise<Todo[]>;
}

export const TodosDAOContext = createContext<TodosDAO>(Symbol("todos-dao"));
