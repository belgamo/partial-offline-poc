import axios from "axios";
import { Todo, TodosDAO } from "./types";

export class RemoteTodosDAO implements TodosDAO {
  private _httpClient = axios.create({ baseURL: "http://localhost:3000" });

  async list() {
    return (await this._httpClient.get<Todo[]>("/todos")).data;
  }

  async get(id: string) {
    return (await this._httpClient.get<Todo>(`/todos/${id}`)).data;
  }

  async save(todo: Todo) {
    return (
      await this._httpClient.patch<Todo>(`/todos/${todo.id}`, {
        ...todo,
      })
    ).data;
  }
}
