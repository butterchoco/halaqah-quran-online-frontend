import { shallowMount, createLocalVue } from "@vue/test-utils";
import Store from "./services/dummystore";
import RegistrationClosed from "@/views/RegistrationClosed.vue";
import Vuex from "vuex"

const localVue = createLocalVue()
localVue.use(Vuex)

describe("RegistrationClosed.vue", () => {
  const store = new Vuex.Store(Store);
  const wrapper = shallowMount(RegistrationClosed, {
    store
  });

  it("renders data when passed", () => {
    const expectedData = {
      img: require("@/assets/img/failed-selection.png"),
      title: "Pendaftaran program sudah ditutup!",
      isPrimary: false,
      isDanger: true,
      msg: "Waktu pendaftaran sudah habis. Silakan tunggu proses seleksi.",
      msg2: "",
      goto: [{ str: "Kembali ke beranda", link: "/" }]
    };
    expect(wrapper.vm.$data).toMatchObject(expectedData);
  });
});
