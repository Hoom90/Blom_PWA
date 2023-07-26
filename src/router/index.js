import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/care",
      name: "care",
      component: () => import("../views/CareView.vue"),
    },
    {
      path: "/prescription/:id",
      name: "prescription",
      component: () => import("../views/PrescriptionView.vue"),
    },
    {
      path: "/chad",
      name: "chad",
      component: () => import("../views/ChadView.vue"),
    },
    {
      path: "/garden",
      name: "garden",
      component: () => import("../views/GardenView.vue"),
    },
    {
      path: "/garden/plants",
      name: "plants",
      component: () => import("../views/PlantsView.vue"),
    },
    {
      path: "/garden/plant/:id",
      name: "plant",
      component: () => import("../views/PlantView.vue"),
    },
    {
      path: "/garden/plantlibrary",
      name: "plantLibrary",
      component: () => import("../views/PlantLibraryView.vue"),
    },
    {
      path: "/garden/addplant/:id",
      name: "addplant",
      component: () => import("../views/AddPlantView.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/info",
      name: "info",
      component: () => import("../views/InfoView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register"];
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
