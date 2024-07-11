import axios from "axios";
import { Todo, TodosDAO, TodosPersistor } from "./types";

export class RemoteTodosDAO implements TodosDAO {
  private _todosPersistor: TodosPersistor;

  constructor(todosPersistor: TodosPersistor) {
    this._todosPersistor = todosPersistor;
  }

  private _httpClient = axios.create({ baseURL: "http://localhost:3000" });

  async list() {
    const data = (await this._httpClient.get<Todo[]>("/todos")).data;

    this._todosPersistor.saveBatch(data);

    return data;
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
