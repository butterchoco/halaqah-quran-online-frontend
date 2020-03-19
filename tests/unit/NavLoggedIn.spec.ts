import { shallowMount, createLocalVue } from "@vue/test-utils";
import Store from "@/store/index.ts";
import NavLoggedIn from "@/components/NavLoggedIn.vue";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("NavLoggedIn Data", () => {
  const store = Store;
  let wrapper = shallowMount(NavLoggedIn, {
    localVue,
    store
  });

  it("has isDropdownActive data", () => {
    expect(wrapper.vm.$data.isDropdownActive).toBeDefined();
  });

  it("has mobile data", () => {
    expect(wrapper.vm.$data.mobile).toBeDefined();
  });

  it("has isSelector data", () => {
    expect(wrapper.vm.$data.isSelector).toBeDefined();
  });

  it("change isDropdownActive if dropdownActive function called", () => {
    expect(wrapper.vm.$data.isDropdownActive).toBe(true);
    wrapper.find(".mob-btn").trigger("click");
    expect(wrapper.vm.$data.isDropdownActive).toBe(false);
  });

  it("calls windowToggle function", () => {
    const windowToggle = jest.fn();
    const getUserRole = jest.fn();
    wrapper = shallowMount(NavLoggedIn, {
      localVue,
      methods: {
        windowToggle,
        getUserRole
      },
      store
    });
    wrapper.vm.$nextTick();
    expect(windowToggle).toBeCalled();
  });

  it("calls profileDropdownActive function", () => {
    const profileDropdownActive = jest.fn();
    wrapper = shallowMount(NavLoggedIn, {
      localVue,
      store,
      data() {
        return {
          isDropdownActive: true,
          isProfileDropdownActive: false
        };
      },
      methods: {
        profileDropdownActive
      }
    });
    wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.isProfileDropdownActive).toBe(false);
    wrapper.find(".profile").trigger("click");
    expect(wrapper.vm.$data.isProfileDropdownActive).toBe(true);
  });
});
