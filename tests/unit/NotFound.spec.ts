import { shallowMount } from "@vue/test-utils";
import NotFound from "@/views/NotFound.vue";

describe("NotFound.vue", () => {
  it("renders data when passed", () => {
    function data() {
      return {
        msg: "Anything",
        title: "title goes here",
        img: require("@/assets/img/404-not-found.png"),
        goto: {
          link: "/",
          str: "Back to home"
        }
      };
    }
    const wrapper = shallowMount(NotFound, {
      data
    });
    expect(wrapper.vm.$data).toMatchObject(data());
  });
});
