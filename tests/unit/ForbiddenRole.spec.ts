import { shallowMount } from "@vue/test-utils";
import ForbiddenRole from "@/views/ForbiddenRole.vue";

describe("ForbiddenRole.vue", () => {
    it("renders data when passed", () => {
        function data() {
            return {
                img: require("@/assets/img/failed-selection.png"),
                title: "Access Restricted",
                msg: "You are not supposed to be here !",
                goto: [{
                    str: "Back to home",
                    link: "/"
                }]
            };
        }
        const wrapper = shallowMount(ForbiddenRole);
        expect(wrapper.vm.$data).toMatchObject(data());
    });
});
