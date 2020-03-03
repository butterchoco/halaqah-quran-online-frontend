import { shallowMount, createLocalVue } from "@vue/test-utils";
import NavLoggedIn from "@/components/NavLoggedIn.vue";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("NavLoggedIn Data", () => {
  let wrapper = shallowMount(NavLoggedIn, {
    localVue
  });

  it("has isDropdownActive data", () => {
    expect(wrapper.vm.$data.isDropdownActive).toBeDefined();
  });

  it("has mobile data", () => {
    expect(wrapper.vm.$data.mobile).toBeDefined();
  });

  it("change isDropdownActive if dropdownActive function called", () => {
    expect(wrapper.vm.$data.isDropdownActive).toBe(true);
    wrapper.find(".mob-btn").trigger("click");
    expect(wrapper.vm.$data.isDropdownActive).toBe(false);
  });

  it("calls windowToggle function", () => {
    const windowToggle = jest.fn();
    wrapper = shallowMount(NavLoggedIn, {
      localVue,
      methods: {
        windowToggle
      }
    });
    wrapper.vm.$nextTick();
    expect(windowToggle).toBeCalled();
  });

  it("calls profileDropdownActive function", () => {
    const profileDropdownActive = jest.fn();
    wrapper = shallowMount(NavLoggedIn, {
      localVue,
      data() {
        return {
          isDropdownActive: true,
          isProfileDropdownActive: false,
        }
      },
      methods: {
        profileDropdownActive
      }
    })
    wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.isProfileDropdownActive).toBe(false);
    wrapper.find(".profile").trigger("click");
    expect(wrapper.vm.$data.isProfileDropdownActive).toBe(true);
  })
});
