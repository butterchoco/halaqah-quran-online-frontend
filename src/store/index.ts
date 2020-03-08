/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
import Pengumuman from "@/store/modules/Pengumuman";
import Home from "@/store/modules/Home";
import ProgramRegistration from "@/store/modules/ProgramRegistration";
import DataCalonPeserta from "@/store/modules/DataCalonPeserta.ts";
import createPersistedState from "vuex-persistedstate"
import Cookies from "js-cookie"
import Axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: "",
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      role: [
        {
          role_id: 0,
          description: ""
        }
      ],
      whatsappNumber: "",
    },
  },
  getters: {
    getRefreshToken: (state: any) => {
      return Cookies.get("HolyKuncen");
    },
    getAccessToken: (state: any) => {
      return Cookies.get("KuncenPuma");
    },
    isUserLoggedIn: (state: any) => {
      if (Cookies.get("HolyKuncen") != null && Cookies.get("KuncenPuma") != null) {
        return true
      }
      return false
    },
    getFullname: (state: any) => {
      return state.user.firstName + " " + state.user.lastName
    },
    getUsername: (state: any) => {
      return state.user.username
    },
    getUserId: (state: any) => {
      return state.user.id
    },
    getUserRole: (state: any) => {
      return state.user.role
    }
  },
  mutations: {
    setRefreshToken: (state: any, payload: any) => {
      Cookies.set("HolyKuncen", payload.value, { expires: 0.5, secure: true })
    },
    setAccessToken: (state: any, payload: any) => {
      Cookies.set("KuncenPuma", payload.value, { expires: 0.01, secure: true })
    },
    removeToken: (state: any) => {
      Cookies.remove("KuncenPuma")
      Cookies.remove("HolyKuncen")
    },
    removeAccessToken: (state: any) => {
      Cookies.remove("KuncenPuma")
    },
    setUserInfo: (state: any, payload: any) => {
      state.user.username = payload.username
      state.user.id = payload.id
      state.user.firstName = payload.firstName
      state.user.lastName = payload.lastName,
        state.user.email = payload.email
      state.user.whatsappNumber = payload.whatsappNumber
    },
    setUserRole: (state: any, payload: any) => {
      state.user.role = payload.role
    }
  },
  actions: {
    resetAccessToken: async ({ commit, dispatch, state }, store) => {
      await Axios.post(process.env.VUE_APP_URL + "/api/auth/jwt/refresh/",
        {
          refresh: Cookies.get("HolyKuncen")
        }
      ).then(response => {
        commit("removeAccessToken")
        commit("setAccessToken", { value: response.data.access });
      }).catch((error) => {
        console.log("Failed to refresh token")
      })
      setTimeout(() => dispatch('resetAccessToken'), 901000)
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