import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { makeRouter } from "./routes";
import { createRef, ref } from "lit/directives/ref.js";
import { TodosDAOContext } from "./data/types";
import { provide } from "@lit/context";
import { RemoteTodosDAO } from "./data/remote-todos.dao";

@customElement("main-app")
export class TodosPage extends LitElement {
  @provide({ context: TodosDAOContext })
  todosDAOProvider = new RemoteTodosDAO();

  private outletRef = createRef();

  async firstUpdated() {
    makeRouter(this.outletRef.value as HTMLElement);
  }

  render() {
    return html`<div ${ref(this.outletRef)}></div>`;
  }
}
