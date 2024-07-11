import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { makeRouter } from "./routes";
import { createRef, ref } from "lit/directives/ref.js";
import { TodosDAOContext, TodosPersistor } from "./data/types";
import { provide } from "@lit/context";
import { RemoteTodosDAO } from "./data/remote-todos.dao";
import { DexiePersistor } from "./data/dexie-todos.persistor";

@customElement("main-app")
export class TodosPage extends LitElement {
  todosPersistor: TodosPersistor = new DexiePersistor();

  @provide({ context: TodosDAOContext })
  todosDAOProvider = new RemoteTodosDAO(this.todosPersistor);

  private outletRef = createRef();

  async firstUpdated() {
    makeRouter(this.outletRef.value as HTMLElement);
  }

  render() {
    return html`<div ${ref(this.outletRef)}></div>`;
  }
}
