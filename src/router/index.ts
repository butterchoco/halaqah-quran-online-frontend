import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Program from "@/views/Program.vue";
import DataCalonPeserta from "@/views/DataCalonPeserta.vue";
import NotFound from "@/views/NotFound.vue";
import SignIn from "@/views/Signin.vue";
import SignUp from "@/views/Signup.vue";
import PengumumanPage from "@/views/PengumumanPage.vue";
import Activation from "@/views/Activation.vue";
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
    path: "/signup",
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn
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
    path: "/activate/:uid/:token",
    name: "Activation",
    component: Activation
  }, {
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
  },
  {
    path: "/data-calon-peserta",
    name: "DataCalonPeserta",
    component: DataCalonPeserta
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
