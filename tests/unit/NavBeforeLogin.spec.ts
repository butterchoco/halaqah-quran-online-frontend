import { shallowMount, createLocalVue } from "@vue/test-utils";
import NavBeforeLogin from "@/components/NavBeforeLogin.vue";
import VueRouter from "vue-router";
import Vuex from "vuex"
import Store from "./services/dummystore";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex)

describe("NavBeforeLogin Data", () => {
    let store = new Vuex.Store(Store)

    it("hideAlert when created", () => {
        const Store = {
            actions: {
                hideAlertError: jest.fn()
            }
        }
        store = new Vuex.Store(Store)
        const wrapper = shallowMount(NavBeforeLogin, {
            localVue,
            store,
        });
        store.dispatch("hideAlertError")
        wrapper.vm.$nextTick()
        expect(Store.actions.hideAlertError).toHaveBeenCalled()
    })

});
