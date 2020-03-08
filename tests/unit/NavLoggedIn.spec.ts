import { shallowMount, createLocalVue } from "@vue/test-utils";
import NavLoggedIn from "@/components/NavLoggedIn.vue";
import VueRouter from "vue-router";
import store from "@/store/index";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("NavLoggedIn Data", () => {
  const wrapper = shallowMount(NavLoggedIn, {
    localVue,
    store,
  });

  it("has isDropdownActive data", () => {
    expect(wrapper.vm.$data.isDropdownActive).toBeDefined();
  });

});
