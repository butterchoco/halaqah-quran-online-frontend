import { shallowMount, createLocalVue } from "@vue/test-utils";
import ErrorToast from "@/components/ErrorToast.vue";
import Vuex from "vuex"
import bootstrap from "bootstrap-vue"
import Store from "./services/dummystore"

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(bootstrap)

describe("ErrorToast.vue", () => {
    const store = new Vuex.Store(Store);
    const wrapper = shallowMount(ErrorToast, {
        localVue,
        store
    });

    it("get getters correctly", () => {
        expect(wrapper.vm.$store.getters.getShowAlertError).toBe(false)
    })
});
