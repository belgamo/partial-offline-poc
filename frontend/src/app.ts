import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { makeRouter } from "./routes";
import { createRef, ref } from "lit/directives/ref.js";
import { TodosDAOContext, TodosPersistor } from "./data/types";
import { provide } from "@lit/context";
import { RemoteTodosDAO } from "./data/remote-todos.dao";
import { DexiePersistor } from "./data/dexie-todos.persistor";
import { LocalTodos } from "./data/local-todos.dao";

@customElement("main-app")
export class App extends LitElement {
  todosPersistor: TodosPersistor = new DexiePersistor();

  remoteTodosDAO = new RemoteTodosDAO(this.todosPersistor);

  @provide({ context: TodosDAOContext })
  localTodosDAO = new LocalTodos();

  private outletRef = createRef();

  @state()
  caching = true;

  async firstUpdated() {
    try {
      await this.remoteTodosDAO.list();
    } catch (error) {
    } finally {
      this.caching = false;
    }

    makeRouter(this.outletRef.value as HTMLElement);
  }

  render() {
    return html`
      ${this.caching ? html`<p>Caching resources...</p>` : null}
      <div ${ref(this.outletRef)}></div>
    `;
  }
}
