import Vue from "vue";
import Vuex from "vuex";
import Home from "@/modules/Home.ts";
import Pengumuman from "@/modules/Pengumuman.ts";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Home,
    Pengumuman
  }
});
