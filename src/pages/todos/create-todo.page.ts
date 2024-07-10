import { Router } from "@vaadin/router";
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("create-todo-page")
export class CreateTodoPage extends LitElement {
  render() {
    return html`
      <h1>Create Todo</h1>

      <form>
        <label for="name">Name</label>
        <input type="text" id="name" />

        <br />

        <label for="done">Is it done?</label>
        <input type="checkbox" id="done" />

        <br />
        <br />

        <button
          @click=${(event: Event) => {
            event.preventDefault();
            Router.go("/todos");
          }}
        >
          Cancel
        </button>
        <button>Save</button>
      </form>
    `;
  }
}
