import { consume } from "@lit/context";
import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Todo, TodosDAO, TodosDAOContext } from "../../data/types";

@customElement("todos-page")
export class TodosPage extends LitElement {
  @consume({ context: TodosDAOContext })
  todosDAO!: TodosDAO;

  static styles = css`
    h1 {
      margin: 0;
    }
  `;

  @state()
  private _todos: Todo[] = [];

  async connectedCallback() {
    super.connectedCallback();

    this._todos = await this.todosDAO.list();
  }

  render() {
    return html`
      <h1>Todos</h1>
      <small>Click on the task to edit it</small>

      <br />
      <br />

      <a href="/todos/create">Create</a>

      <br />

      <ul>
        ${this._todos.map(
          (todo) => html` <li>${todo.name} ${todo.done ? "✅" : "⏳"}</li> `
        )}
      </ul>
    `;
  }
}
