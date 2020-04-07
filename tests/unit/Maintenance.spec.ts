import { shallowMount } from "@vue/test-utils";
import Maintenance from "@/views/Maintenance.vue";

describe("Maintenance.vue", () => {
  it("renders data when passed", () => {
    function data() {
      return {
        img: require("@/assets/img/maintenance.png"),
        title: "Sorry, this page is under maintenance !",
        msg: "Please come back later until it's up."
      };
    }
    const wrapper = shallowMount(Maintenance);
    expect(wrapper.vm.$data).toMatchObject(data());
  });
});
