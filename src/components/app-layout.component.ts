import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("app-layout")
export class AppLayout extends LitElement {
  static styles = css`
    .content {
      padding-left: 40px;
    }
  `;

  render() {
    return html`
      <ul>
        <nav>
          <a href="/">Home</a>
          <a href="/todos">Todos</a>
        </nav>
      </ul>
      <div class="content">
        <slot></slot>
      </div>
    `;
  }
}
