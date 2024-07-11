import { Router } from "@vaadin/router";
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { Todo } from "../data/types";

@customElement("todo-form")
export class TodoForm extends LitElement {
  initialData: Todo = { id: "0", name: "", done: false };

  render() {
    return html`
      <form>
        <label for="name">Name</label>
        <input type="text" id="name" value=${this.initialData.name} />

        <br />

        <label for="done">Is it done?</label>
        <input type="checkbox" id="done" ?checked=${this.initialData.done} />

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
