import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("todos-page")
export class TodosPage extends LitElement {
  render() {
    return html`
      <h1>Todos</h1>
      <a href="/todos/create">Create</a>
    `;
  }
}
