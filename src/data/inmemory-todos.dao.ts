import { Todo, TodosDAO } from "./types";

export class InMemoryTodos implements TodosDAO {
  private todos: Todo[] = [
    { id: "1", name: "Do the dishes", done: true },
    { id: "2", name: "Study math", done: false },
  ];

  list() {
    return new Promise<Todo[]>((resolve) => resolve(this.todos));
  }

  get(id: string) {
    return new Promise<Todo | undefined>((resolve) =>
      resolve(this.todos.find((todo) => todo.id === id))
    );
  }
}
