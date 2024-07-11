import { Router } from "@vaadin/router";

export const makeRouter = (outlet: HTMLElement) => {
  const router = new Router(outlet);

  router.setRoutes([
    {
      path: "/",
      action: async () => {
        await import("./components/app-layout.component");
      },
      component: "app-layout",
      children: [
        {
          path: "/",
          component: "home-page",
          action: async () => {
            await import("./pages/home.page");
          },
        },
        {
          path: "/todos",
          component: "todos-page",
          action: async () => {
            await import("./pages/todos/todos-list.page");
          },
        },
        {
          path: "/todos/create",
          component: "create-todo-page",
          action: async () => {
            await import("./pages/todos/create-todo.page");
          },
        },
        {
          path: "/todos/:id",
          component: "edit-todo-page",
          action: async () => {
            await import("./pages/todos/edit-todo.page");
          },
        },
      ],
    },
  ]);

  return router;
};
