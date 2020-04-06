import { shallowMount } from "@vue/test-utils";
import NotFound from "@/views/NotFound.vue";

describe("NotFound.vue", () => {
  it("renders data when passed", () => {
    function data() {
      return {
        img: require("@/assets/img/404-not-found.png"),
        title: "404 Not Found",
        msg: "Where are you going ? Nobody here.",
        goto: [{
          link: "/",
          str: "Back to home"
        }]
      };
    }
    const wrapper = shallowMount(NotFound);
    expect(wrapper.vm.$data).toMatchObject(data());
  });
});
