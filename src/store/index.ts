import Vue from "vue";
import Vuex from "vuex";
import Pengumuman from "@/store/modules/Pengumuman";
import Home from "@/store/modules/Home";
import ProgramRegistration from "@/store/modules/ProgramRegistration";
import DataCalonPeserta from "@/store/modules/DataCalonPeserta.ts";
import createPersistedState from "vuex-persistedstate"
import * as Cookies from "js-cookie";

Vue.use(Vuex);

export default new Vuex.Store({
  state : {
  },
  getters : {
      getRefreshToken: (state) => {
          return Cookies.get("KuncenPuma");
      },
      getAccessToken: (state) => {
          return Cookies.get("HolyKuncen");
      },
      isUserLoggedIn: (state) => {
        if (Cookies.get("HolyKuncen") != null) {
          return true
        }
        return false
      }
  },
  mutations : {
    setRefreshToken: (state: any, payload: any) => {
      Cookies.set("KuncenPuma", payload.value, { expires: 0.5 })
    },
    setAccessToken: (state: any, payload: any) => {
      Cookies.set("HolyKuncen", payload.value, { expires: 0.01 })
    },
    removeToken: () => {
      Cookies.remove("KuncenPuma")
      Cookies.remove("HolyKuncen")
    }
  },
  modules: {
    Home,
    Pengumuman,
    ProgramRegistration,
    DataCalonPeserta
  },
  plugins: [
    createPersistedState()
  ]
});