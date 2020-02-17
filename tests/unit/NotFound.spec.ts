import { shallowMount } from "@vue/test-utils";
import ErrorPage from "@/components/ErrorPage.vue";

describe("ErrorPage.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(ErrorPage, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  }),
    it("renders props.title when passed", () => {
      const title = "title goes here";
      const wrapper = shallowMount(ErrorPage, {
        propsData: { title }
      });
      expect(wrapper.text()).toMatch(title);
    }),
    it("renders props.img when passed", () => {
      const img = require("@/assets/img/404-not-found.png");
      const wrapper = shallowMount(ErrorPage, {
        propsData: { img }
      });
      expect(wrapper.text()).toMatch(img);
    });
});
