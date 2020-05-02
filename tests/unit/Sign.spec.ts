import Sign from "@/views/Sign.vue"
import { shallowMount, createLocalVue } from "@vue/test-utils"
import BootstrapVue from "bootstrap-vue"
import routes from "./services/dummyRouter";
import VueRouter from "vue-router"
import Vuex from "vuex"
import Store from "./services/dummystore"

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(BootstrapVue)
localVue.use(Vuex)

describe("Sign.vue", () => {
    const router = new VueRouter({ routes })
    const store = new Vuex.Store(Store)
    const wrapper = shallowMount(Sign, {
        router,
        store,
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