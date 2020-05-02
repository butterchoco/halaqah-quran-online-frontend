import { shallowMount, createLocalVue } from "@vue/test-utils";
import Store from "./services/dummystore";
import RegistrationSuccess from "@/views/RegistrationSuccess.vue";
import Vuex from "vuex"

const localVue = createLocalVue()
localVue.use(Vuex)

describe("RegistrationSuccess.vue", () => {
  const store = new Vuex.Store(Store);
  const wrapper = shallowMount(RegistrationSuccess, {
    store
  });

  it("renders data when passed", () => {
    wrapper.vm.$nextTick()
  });
});
