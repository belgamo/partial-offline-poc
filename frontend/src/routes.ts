import { Router } from "@vaadin/router";

import "./components/app-layout.component";
import "./pages/home.page";
import "./pages/todos/todos-list.page";
import "./pages/todos/edit-todo.page";

export const makeRouter = (outlet: HTMLElement) => {
  const router = new Router(outlet);

  router.setRoutes([
    {
      path: "/",
      component: "app-layout",
      children: [
        {
          path: "/",
          component: "home-page",
        },
        {
          path: "/todos",
          component: "todos-page",
        },
        {
          path: "/todos/:id",
          component: "edit-todo-page",
        },
      ],
    },
  ]);

  return router;
};
