import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Program from "@/views/Program.vue";
import NotFound from "@/views/NotFound.vue";
import PengumumanPage from "@/views/PengumumanPage.vue";
import RegistrationSuccess from "@/views/RegistrationSuccess.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    name: "NotFound",
    component: NotFound
  },
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/program",
    name: "Program",
    component: Program
  },
  {
    path: "/pengumuman",
    name: "pengumuman",
    component: PengumumanPage
  },
  {
    path: "/regis-success",
    name: "RegistrationSuccess",
    component: RegistrationSuccess
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
