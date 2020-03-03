import Vue from "vue";
import Vuex from "vuex";
import Pengumuman from "@/store/modules/Pengumuman";
import Home from "@/store/modules/Home";
import ProgramRegistration from "@/store/modules/ProgramRegistration";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Home,
    Pengumuman,
    ProgramRegistration
  }
});
