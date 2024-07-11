import { Todo, TodosDAO } from "./types";

export class InMemoryTodos implements TodosDAO {
  private todos: Todo[] = [
    {
      id: "1",
      name: "Do the dishes",
      duration: "2 hours",
      complexity: "medium",
      done: true,
    },
    { id: "2", name: "Study math", duration: "", complexity: "", done: false },
    {
      id: "3",
      name: "Walk the dogs",
      duration: "",
      complexity: "",
      done: false,
    },
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
