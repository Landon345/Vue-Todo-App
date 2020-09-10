import { createRouter, createWebHashHistory } from "vue-router";
import FullTodos from "../views/FullTodos.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

const routes = [
  {
    path: "/",
    name: "Todos",
    component: FullTodos,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// GOOD
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!localStorage.getItem("api_token")) {
      next({
        name: "login",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
