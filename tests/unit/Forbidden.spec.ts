import { shallowMount, createLocalVue } from "@vue/test-utils";
import ForbiddenRole from "@/views/Forbidden.vue";
import VueRouter from "vue-router"
import routes from "./services/dummyRouter"

const localVue = createLocalVue()
localVue.use(VueRouter)

describe("ForbiddenRole.vue", () => {
    const router = new VueRouter({ routes })
    it("renders data when passed", () => {
        function data() {
            return {
                img: "",
                title: "",
                msg: "",
                goto: []
            };
        }
        const wrapper = shallowMount(ForbiddenRole, {
            localVue,
            router
        });
        expect(wrapper.vm.$data).toMatchObject(data());
    });
});
