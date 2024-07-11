import { Todo, TodosPersistor } from "./types";
import { TodosProgressLocalDB } from "./todos.localdb";

export class DexiePersistor implements TodosPersistor {
  async saveBatch(todos: Todo[]) {
    await TodosProgressLocalDB.todos.bulkPut(todos);
  }
}
