import { shallowMount, createLocalVue } from '@vue/test-utils'
import Announcement from '@/views/Announcement.vue'
import Store from "./services/dummystore"
import routes from "./services/dummyRouter"
import Vuex from "vuex"
import VueRouter from "vue-router"

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('Announcement.vue', () => {
    const store = new Vuex.Store(Store)
    const gotoAnnouncementSuccess = jest.fn()
    const gotoAnnouncementFailed = jest.fn()
    const gotoLoginForbidden = jest.fn()
    let wrapper: any;

    it("call method gotoLoginForbidden if role == 0", async () => {
        wrapper = shallowMount(Announcement, {
            localVue,
            store,
            methods: {
                gotoLoginForbidden
            }
        })
        expect(gotoLoginForbidden).toHaveBeenCalled()
    })

    it("call method gotoAnnouncementFailed if isPassed false", async () => {
        store.commit("setUserRole", {
            role: [{
                "role_id": 1
            }]
        })
        wrapper = shallowMount(Announcement, {
            localVue,
            store,
            methods: {
                gotoAnnouncementFailed,
            }
        })
        expect(gotoAnnouncementFailed).toHaveBeenCalled()
    })

    it("call method gotoAnnouncementFailed if isPassed true", async () => {
        store.commit("setUserRole", {
            role: [{
                "role_id": 1
            }]
        })
        store.commit("setPassed", { value: true })
        wrapper = shallowMount(Announcement, {
            localVue,
            store,
            methods: {
                gotoAnnouncementSuccess,
            }
        })
        expect(gotoAnnouncementSuccess).toHaveBeenCalled()
    })

    it("change Route if gotoAnnouncementSuccess called", async () => {
        const router = new VueRouter({ routes })
        wrapper = shallowMount(Announcement, {
            localVue,
            store,
            router
        })
        wrapper.vm.gotoAnnouncementSuccess()
        router.push("/announcement-success")
        expect(wrapper.vm.$route.path).toBe("/announcement-success")
    })

    it("change Route if gotoAnnouncementFailed called", async () => {
        const router = new VueRouter({ routes })
        wrapper = shallowMount(Announcement, {
            localVue,
            store,
            router
        })
        wrapper.vm.gotoAnnouncementFailed()
        router.push("/announcement-failed")
        expect(wrapper.vm.$route.path).toBe("/announcement-failed")
    })

    it("change Route if gotoLoginForbidden called", async () => {
        const router = new VueRouter({ routes })
        wrapper = shallowMount(Announcement, {
            localVue,
            store,
            router
        })
        wrapper.vm.gotoLoginForbidden()
        router.push("/forbidden/login")
        expect(wrapper.vm.$route.path).toBe("/forbidden/login")
    })
})