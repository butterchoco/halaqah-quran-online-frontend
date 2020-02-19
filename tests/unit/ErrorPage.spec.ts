import { shallowMount, createLocalVue } from "@vue/test-utils";
import ErrorPage from "@/components/ErrorPage.vue";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("ErrorPage.vue", () => {
  it("renders props when passed", () => {
    const prop = {
      msg: "Anything",
      title: "title goes here",
      img: require("@/assets/img/404-not-found.png"),
      goto: {
        link: "/",
        str: "Back to home"
      }
    };
    const wrapper = shallowMount(ErrorPage, {
      propsData: prop,
      localVue,
      stubs: ["router-link", "router-view"]
    });
    expect(wrapper.props()).toMatchObject(prop);
  });
});
