import { shallowMount, createLocalVue } from "@vue/test-utils";
import Store from "./services/dummystore";
import DataCalonPeserta from "@/views/DataCalonPeserta.vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import BootstrapVue from 'bootstrap-vue';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe("Data Calon Peserta", () => {
  const store = new Vuex.Store(Store)
  let wrapper: any;

  it("call gotoLoginForbiddenPage when role is not login", async () => {
    const gotoLoginForbidden = jest.fn()
    store.commit("setUserRole", {
      role: [
        {
          "role_id": 0,
          "description": "student_selector"
        }
      ]
    })
    wrapper = shallowMount(DataCalonPeserta, {
      localVue,
      store,
      methods: {
        gotoLoginForbidden
      }
    })
    await wrapper.vm.$nextTick()
    expect(gotoLoginForbidden).toHaveBeenCalled()
  })

  it("call gotoForbiddenPage when role is not student_selector", async () => {
    const gotoForbiddenPage = jest.fn()
    store.commit("setUserRole", {
      role: [
        {
          "role_id": 5,
          "description": "student_selector"
        }
      ]
    })
    wrapper = shallowMount(DataCalonPeserta, {
      localVue,
      store,
      methods: {
        gotoForbiddenPage
      }
    })
    await wrapper.vm.$nextTick()
    expect(gotoForbiddenPage).toHaveBeenCalled()
  })

  it("call getDataCalon and getDataNilaiCalon Method when getParticipationSelectionPeriodOpened is true", async () => {
    const getDataCalon = jest.fn()
    const getDataNilaiCalon = jest.fn()
    store.commit("setUserRole", {
      role: [
        {
          "role_id": 4,
          "description": "student_selector"
        }
      ]
    })
    store.commit("setPeriodCategory", { value: "participant_selection" })
    wrapper = shallowMount(DataCalonPeserta, {
      localVue,
      store,
      methods: {
        getDataCalon,
        getDataNilaiCalon
      }
    })
    await wrapper.vm.$nextTick()
    expect(getDataCalon).toHaveBeenCalled()
    expect(getDataNilaiCalon).toHaveBeenCalled()
  })

  it("selector sees participant list", () => {
    wrapper = shallowMount(DataCalonPeserta, {
      localVue,
      store
    });
    wrapper.vm.toggleModalNilai({ id: 123 })
    wrapper.vm.$nextTick()
  });

  it("selector sees participant list", () => {
    wrapper = shallowMount(DataCalonPeserta, {
      localVue,
      store
    });
    wrapper.vm.toggleModal({ id: 123 })
    wrapper.vm.$nextTick()
  });

  it("selector sees participant list", () => {
    wrapper = shallowMount(DataCalonPeserta, {
      localVue,
      store
    });
    wrapper.vm.handleSubmit({ id: 123 })
    wrapper.vm.$nextTick()
  });

  it("selector sees participant list", () => {
    wrapper = shallowMount(DataCalonPeserta, {
      localVue,
      store
    });
    wrapper.vm.getDataCalon()
    wrapper.vm.$nextTick()
  });

  it("selector sees participant list", () => {
    wrapper = shallowMount(DataCalonPeserta, {
      localVue,
      store
    });
    wrapper.vm.getDataNilaiCalon()
    wrapper.vm.$nextTick()
  });
});
