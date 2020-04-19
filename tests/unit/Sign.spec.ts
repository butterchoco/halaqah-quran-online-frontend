import Sign from "@/views/Sign.vue"
import { shallowMount, createLocalVue } from "@vue/test-utils"
import BootstrapVue from "bootstrap-vue"
import routes from "./services/dummyRouter";
import VueRouter from "vue-router"

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(BootstrapVue)

describe("Sign.vue", () => {
    const router = new VueRouter({ routes })
    const wrapper = shallowMount(Sign, {
        router,
        localVue
    })
    it("test signinFlag to true if route sign/in", async () => {
        router.push("/sign/in")
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.$data.signinFlag).toBe(true)
    })
    it("test signinFlag to true if route sign/up", async () => {
        router.push("/sign/up")
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.$data.signinFlag).toBe(false)
    })
})