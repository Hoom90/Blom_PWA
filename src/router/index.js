import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "plantLibrary",
      component: () => import("../views/PlantLibraryView.vue"),
    },
    {
      path: "/garden",
      name: "garden",
      component: () => import("../views/GardenView.vue"),
    },
    {
      path: "/addplant/:id",
      name: "addplant",
      component: () => import("../views/AddPlantView.vue"),
    },
    {
      path: "/prescription/:id",
      name: "prescription",
      component: () => import("../views/PrescriptionView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("token");
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});
export default router;
