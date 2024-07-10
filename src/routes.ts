import { Router } from "@vaadin/router";

const router = new Router(document.getElementById("outlet"));

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
          await import("./pages/todos.page");
        },
      },
    ],
  },
]);
