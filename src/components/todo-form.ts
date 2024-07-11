import { Router } from "@vaadin/router";
import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { Todo } from "../data/types";

const COMPLEXITY_OPTIONS = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

@customElement("todo-form")
export class TodoForm extends LitElement {
  static styles = css`
    label {
      font-weight: bold;
    }
  `;

  initialData: Todo = {
    id: "0",
    name: "",
    complexity: "medium",
    duration: "",
    done: false,
  };

  get isEditable() {
    return !this.initialData.done;
  }

  render() {
    return html`
      <form>
        <label for="name">Name</label>
        <span>${this.initialData.name}</span>

        <br />

        <label for="complexity">How hard was it?</label>
        ${this.isEditable
          ? html`<select id="complexity">
              <option ?selected=${this.initialData.complexity === ""} disabled>
                Select
              </option>
              ${COMPLEXITY_OPTIONS.map(
                ({ value, label }) =>
                  html`
                    <option
                      ?selected=${value === this.initialData.complexity}
                      value=${value}
                    >
                      ${label}
                    </option>
                  `
              )}
            </select>`
          : html`<span>
              <span
                >${COMPLEXITY_OPTIONS.find(
                  (c) => c.value === this.initialData.complexity
                )?.label}</span
              ></span
            >`}

        <br />

        <label for="duration">How long was it?</label>
        ${this.isEditable
          ? html`<input
              type="text"
              id="duration"
              value=${this.initialData.duration}
            />`
          : html`<span>${this.initialData.duration}</span>`}

        <br />
        <br />

        ${!this.isEditable
          ? html`
              <span>This task is done, congrats!</span>

              <br />
              <br />

              <button
                @click=${(event: Event) => {
                  event.preventDefault();
                  Router.go("/todos");
                }}
              >
                Go back
              </button>
            `
          : html`
              <button
                @click=${(event: Event) => {
                  event.preventDefault();
                  Router.go("/todos");
                }}
              >
                Cancel
              </button>
              <button>Save</button>
              <button>Complete</button>
            `}
      </form>
    `;
  }
}
