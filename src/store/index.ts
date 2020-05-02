/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
import Pengumuman from "@/store/modules/Pengumuman";
import Home from "@/store/modules/Home";
import ProgramRegistration from "@/store/modules/ProgramRegistration";
import DataCalonPeserta from "@/store/modules/DataCalonPeserta";
import AlertError from "@/store/modules/AlertError"
import createPersistedState from "vuex-persistedstate"
import Cookies from "js-cookie"
import User from "@/services/User"
Vue.use(Vuex);

const user = {
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
}

export default new Vuex.Store({
  state: {
    user: user,
    latest_opened: {
      id: "",
      term: "",
      urlWhatsappGroup: "",
      start_time: "",
      end_time: "",
      category: ""
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
    getFirstname: (state: any) => {
      return state.user.firstName
    },
    getLastname: (state: any) => {
      return state.user.lastName
    },
    getUsername: (state: any) => {
      return state.user.username
    },
    getUserId: (state: any) => {
      return state.user.id
    },
    getUserRole: (state: any) => {
      return state.user.role
    },
    getUrlWhatsappGroup: (state: any) => {
      return state.latest_opened.urlWhatsappGroup
    },
    getTermName: (state: any) => {
      return state.latest_opened.term
    },
    getPeriodId: (state: any) => {
      return state.latest_opened.id
    },
    getPeriodStart: (state: any) => {
      return state.latest_opened.start_time
    },
    getPeriodEnd: (state: any) => {
      return state.latest_opened.end_time
    },
    getPeriodCategory: (state: any) => {
      return state.latest_opened.category
    },
    getRegistrationPeriodOpened: (state: any) => {
      if (state.latest_opened.category === "registration") {
        return true
      }
      return false;
    },
    getParticipantSelectionPeriodOpened: (state: any) => {
      if (state.latest_opened.category === "participant_selection") {
        return true
      }
      return false;
    },
    getSchedulePeriodOpened: (state: any) => {
      if (state.latest_opened.category === "schedule_choice") {
        return true
      }
      return false;
    },
    getPaymentPeriodOpened: (state: any) => {
      if (state.latest_opened.category === "payment") {
        return true
      }
      return false;
    },
    getClassPeriodOpened: (state: any) => {
      if (state.latest_opened.category === "class") {
        return true
      }
      return false;
    }
  },
  mutations: {
    setRefreshToken: (state: any, payload: any) => {
      Cookies.set("HolyKuncen", payload.value, { expires: 0.5, secure: false })
    },
    setAccessToken: (state: any, payload: any) => {
      Cookies.set("KuncenPuma", payload.value, { expires: 0.01, secure: false })
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
    setUser: (state: any, payload: any) => {
      state.user = payload.user
    },
    setUserRole: (state: any, payload: any) => {
      state.user.role = payload.role
    },
    setPeriod: (state: any, payload: any) => {
      state.latest_opened = payload.latest_opened
    },
    setPeriodCategory: (state: any, payload: any) => {
      state.latest_opened.category = payload.value
    }
  },
  actions: {
    resetAccessToken: async ({ dispatch, getters }) => {
      await User.refreshJWTToken(process.env.VUE_APP_URL, getters.getRefreshToken)
      setTimeout(() => dispatch('resetAccessToken'), 901000)
    },
    resetUserInfo: ({ commit }) => {
      sessionStorage.clear()
    }
  },
  modules: {
    Home,
    Pengumuman,
    ProgramRegistration,
    DataCalonPeserta,
    AlertError
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
});