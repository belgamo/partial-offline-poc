import Dexie, { EntityTable } from "dexie";
import { Todo } from "./types";

export const TodosProgressLocalDB = new Dexie("TodosProgress") as Dexie & {
  todos: EntityTable<Todo>;
};
TodosProgressLocalDB.version(1).stores({
  todos: "&id",
});
