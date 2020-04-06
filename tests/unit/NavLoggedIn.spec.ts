import { shallowMount, createLocalVue } from "@vue/test-utils";
import NavLoggedIn from "@/components/NavLoggedIn.vue";
import VueRouter from "vue-router";
import Vuex from "vuex"
import Store from "./services/dummystore";
import axios from 'axios'
import User from "@/services/User"
import MockAdapter from 'axios-mock-adapter';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex)

describe("NavLoggedIn Data", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  const store = new Vuex.Store(Store)
  const wrapper = shallowMount(NavLoggedIn, {
    localVue,
    store,
  });

  it("has isDropdownActive data", () => {
    expect(wrapper.vm.$data.isDropdownActive).toBeDefined();
  });

  it("call dropdownActivate and change the data", async () => {
    wrapper.find(".profile.desktop").trigger("click")
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.isDropdownActive).toBe(true);
  });

  it("calls Axios on User.getInfo() and return the data", (done) => {
    const resp = {
      data: true
    }
    const mock = new MockAdapter(axios)
    mock.onGet(process.env.VUE_APP_URL + "/api/auth/users/me/").reply(200, resp)
    User.getInfo(process.env.VUE_APP_URL, store.getters.getAccessToken).then(response => {
      expect(response).toEqual(resp)
      done()
    }).catch(error => {
      store.dispatch("setAlertError", { value: error.status });
      done()
    })
  })

  it("calls Axios on User.getRole() and return the roles", (done) => {
    const resp = {
      roles: wrapper.vm.$store.getters.getUserRole
    }
    const mock = new MockAdapter(axios)
    mock.onGet(process.env.VUE_APP_URL + "/api/auth/users/me/roles/").reply(200, resp)
    User.getRole(process.env.VUE_APP_URL, store.getters.getAccessToken).then(response => {
      expect(response).toEqual(resp)
      done()
    }).catch(error => {
      store.dispatch("setAlertError", { value: error.status });
      done()
    })
  })

  it("calls Axios on User.getLatestPeriod() and return the data", (done) => {
    const resp = {
      data: true
    }
    const mock = new MockAdapter(axios)
    mock.onGet(process.env.VUE_APP_URL + "/api/tahfidz/selections/latest/").reply(200, resp)
    User.getLatestPeriod(process.env.VUE_APP_URL).then(response => {
      expect(response).toEqual(resp)
      done()
    }).catch(error => {
      store.dispatch("setAlertError", { value: error.status });
      done()
    })
  })

});
