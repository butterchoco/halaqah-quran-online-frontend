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
          return Cookies.get("RefreshToken");
      },
      getAccessToken: (state) => {
          return Cookies.get("AccessToken");
      },
      getSelectionPeriod: (state) => {
        return Cookies.get("SelectionPeriod")
      },
      isUserLoggedIn: (state) => {
        if (Cookies.get("RefreshToken") != null) {
          return true
        }
        return false
      }
  },
  mutations : {
    setRefreshToken: (state: any, payload: any) => {
      Cookies.set("RefreshToken", payload.value, { expires: 0.5 })
    },
    setAccessToken: (state: any, payload: any) => {
      Cookies.set("AccessToken", payload.value, { expires: 0.01 })
    },
    setSelectionPeriod: (state: any, payload: any) => {
      Cookies.set("SelectionPeriod", payload.value)
    },
    removeToken: () => {
      Cookies.remove("RefreshToken")
      Cookies.remove("AccessToken")
      Cookies.remove("SelectionPeriod")
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