import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Program from "@/views/Program.vue";
import Maintenance from "@/views/Maintenance.vue";
import NotFound from "@/views/NotFound.vue";
import PengumumanPage from "@/views/PengumumanPage.vue";
import ProgramRegistration from "@/views/ProgramRegistration.vue";
import RegistrationClosed from "@/views/RegistrationClosed.vue";
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
    path: "/program-registration",
    name: "Program Registration",
    component: ProgramRegistration
  },
  {
    path: "/regis-success",
    name: "RegistrationSuccess",
    component: RegistrationSuccess
  },
  {
    path: "/regis-closed",
    name: "RegistrationClosed",
    component: RegistrationClosed
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
