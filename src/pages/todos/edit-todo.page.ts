import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { TodoForm } from "../../components/todo-form";
import { consume } from "@lit/context";
import { TodosDAOContext, TodosDAO, Todo } from "../../data/types";
import { Router, RouterLocation } from "@vaadin/router";

TodoForm;

@customElement("edit-todo-page")
export class EditTodoPage extends LitElement {
  @consume({ context: TodosDAOContext })
  todosDAO!: TodosDAO;

  @state()
  private _todo!: Todo | undefined;

  async onAfterEnter(location: RouterLocation) {
    this._todo = await this.todosDAO.get(location.params.id as string);
  }

  connectedCallback(): void {
    super.connectedCallback();
  }

  private async _onSaveEvent(event: CustomEvent<{ todo: Todo }>) {
    await this.todosDAO.save(event.detail.todo);
    Router.go("/todos");
  }

  render() {
    if (!this._todo) return html`Task not found`;

    return html`
      <h1>Edit Todo</h1>

      <todo-form
        @save-event=${(event: CustomEvent<{ todo: Todo }>) =>
          this._onSaveEvent(event)}
        .initialData=${this._todo}
      ></todo-form>
    `;
  }
}
