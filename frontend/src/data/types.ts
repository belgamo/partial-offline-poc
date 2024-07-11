import { createContext } from "@lit/context";

export type Todo = {
  id: string;
  name: string;
  duration: string;
  complexity: string;
  done: boolean;
};

export interface TodosDAO {
  list(): Promise<Todo[]>;
  get(id: string): Promise<Todo | undefined>;
  save(todo: Todo): Promise<Todo | undefined>;
}

export interface TodosPersistor {
  saveBatch(todo: Todo[]): Promise<void>;
}

export const TodosDAOContext = createContext<TodosDAO>(Symbol("todos-dao"));
