import { TodosProgressLocalDB } from "./todos.localdb";
import { Todo, TodosDAO } from "./types";

export class LocalTodosDAO implements TodosDAO {
  async list(): Promise<Todo[]> {
    return await TodosProgressLocalDB.todos.toArray();
  }

  async get(id: string) {
    return await TodosProgressLocalDB.todos.where("id").equals(id).first();
  }

  save(_todo: Todo): Promise<Todo | undefined> {
    throw new Error("Method not implemented.");
  }
}
