import { createRouter, createWebHistory } from "vue-router";
import { getAuth } from "firebase/auth";

import Login from "../views/Login.vue";
import Main from "../views/Main.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/main",
    name: "Main",
    component: Main,
    meta: { requireAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const auth = getAuth();
    if (auth.currentUser === null) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
