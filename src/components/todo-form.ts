import { Router } from "@vaadin/router";
import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { Todo } from "../data/types";
import { createRef, ref } from "lit/directives/ref.js";

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

  private formElement = createRef<HTMLFormElement>();

  get isEditable() {
    return !this.initialData.done;
  }

  private _getFormData() {
    const data = new FormData(this.formElement.value);

    const todo: Todo = {
      ...this.initialData,
      complexity: data.get("complexity") as string,
      duration: data.get("duration") as string,
    };

    return todo;
  }

  private _save(event: Event) {
    event.preventDefault();

    const saveEvent = new CustomEvent("save-event", {
      bubbles: true,
      composed: true,
      detail: { todo: this._getFormData() },
    });
    this.dispatchEvent(saveEvent);
  }

  private _complete(event: Event) {
    event.preventDefault();

    const isValid = this.formElement.value?.reportValidity();

    if (!isValid) return;

    const saveEvent = new CustomEvent("save-event", {
      bubbles: true,
      composed: true,
      detail: { todo: { ...this._getFormData(), done: true } },
    });
    this.dispatchEvent(saveEvent);
  }

  render() {
    return html`
      <form ${ref(this.formElement)}>
        <label for="name">Name</label>
        <span>${this.initialData.name}</span>

        <br />

        <label for="complexity">How hard was it?</label>
        ${this.isEditable
          ? html`<select name="complexity" id="complexity" required>
              <option
                value=""
                ?selected=${this.initialData.complexity === ""}
                disabled
              >
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
              name="duration"
              value=${this.initialData.duration}
              required
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
              <button @click=${this._save}>Save</button>
              <button @click=${this._complete}>Complete</button>
            `}
      </form>
    `;
  }
}
