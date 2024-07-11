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

      <ul>
        ${this._todos
          .sort((x, y) => {
            return x.done === y.done ? 0 : x.done ? 1 : -1;
          })
          .map(
            (todo) => html`
              <li>
                <a href="/todos/${todo.id}">${todo.name}</a>
                ${todo.done ? "✅" : "⏳"}
              </li>
            `
          )}
      </ul>
    `;
  }
}
