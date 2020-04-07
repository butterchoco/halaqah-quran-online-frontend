import { shallowMount, createLocalVue } from "@vue/test-utils";
import Store from "@/store/index.ts";
import DataCalonPeserta from "@/views/DataCalonPeserta.vue";
import VueRouter from "vue-router";
import BootstrapVue from 'bootstrap-vue';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(BootstrapVue)

describe("Data Calon Peserta", () => {
  const store = Store;
  it("selector sees participant list", () => {
    const wrapper = shallowMount(DataCalonPeserta, {
      localVue,
      store
    });
    wrapper.vm.$nextTick()
  });
});
