import { shallowMount, createLocalVue } from "@vue/test-utils";
import NavBeforeLogin from "@/components/NavBeforeLogin.vue";
import App from "@/App.vue";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("NavBeforeLogin Data", () => {
  let wrapper = shallowMount(NavBeforeLogin, {
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
    wrapper = shallowMount(NavBeforeLogin, {
      localVue,
      methods: {
        windowToggle
      }
    });
    wrapper.vm.$nextTick();
    expect(windowToggle).toBeCalled();
  });

});
