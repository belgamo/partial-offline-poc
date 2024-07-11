import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { TodoForm } from "../../components/todo-form";

TodoForm;

@customElement("create-todo-page")
export class CreateTodoPage extends LitElement {
  render() {
    return html`
      <h1>Create Todo</h1>

      <todo-form></todo-form>
    `;
  }
}
