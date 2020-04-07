import { shallowMount } from "@vue/test-utils";
import LoginForbidden from "@/views/LoginForbidden.vue";

describe("LoginForbidden.vue", () => {
    it("renders data when passed", () => {
        function data() {
            return {
                img: require("@/assets/img/failed-selection.png"),
                title: "You are not logged in !",
                msg: "Login first to access this page",
                goto: [{
                    str: "Login to my account",
                    link: "/sign/in"
                }]
            };
        }
        const wrapper = shallowMount(LoginForbidden);
        expect(wrapper.vm.$data).toMatchObject(data());
    });
});
