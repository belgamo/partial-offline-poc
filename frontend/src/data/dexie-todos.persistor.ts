import Dexie, { EntityTable } from "dexie";
import { Todo, TodosPersistor } from "./types";

const TodosProgressLocalDB = new Dexie("TodosProgress") as Dexie & {
  todos: EntityTable<Todo>;
};
TodosProgressLocalDB.version(1).stores({
  todos: "&id",
});

export class DexiePersistor implements TodosPersistor {
  async saveBatch(todos: Todo[]) {
    await TodosProgressLocalDB.todos.bulkPut(todos);
  }
}
