import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { TodoForm } from "../../components/todo-form";
import { consume } from "@lit/context";
import { TodosDAOContext, TodosDAO, Todo } from "../../data/types";
import { RouterLocation } from "@vaadin/router";

TodoForm;

@customElement("edit-todo-page")
export class CreateTodoPage extends LitElement {
  @consume({ context: TodosDAOContext })
  todosDAO!: TodosDAO;

  @state()
  private _todo!: Todo | undefined;

  async onAfterEnter(location: RouterLocation) {
    this._todo = await this.todosDAO.get(location.params.id as string);
  }

  render() {
    if (!this._todo) return html`Task not found`;

    return html`
      <h1>Edit Todo</h1>

      <todo-form .initialData=${this._todo}></todo-form>
    `;
  }
}
