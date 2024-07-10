import { Todo, TodosDAO } from "./types";

export class InMemoryTodos implements TodosDAO {
  private todos: Todo[] = [
    { id: "1", name: "Do the dishes", done: true },
    { id: "2", name: "Study math", done: false },
  ];

  list() {
    return new Promise<Todo[]>((resolve) => resolve(this.todos));
  }
}
