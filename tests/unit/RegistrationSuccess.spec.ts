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
    const expectedData = {
      img: require("@/assets/img/registration-success.png"),
      title: "Selamat Proses Daftar Berhasil!",
      isPrimary: true,
      msg: "Mohon menunggu proses seleksi.",
      msg2: "Pengumuman proses seleksi akan diumumkan dalam 7 hari ke depan."
    };
    expect(wrapper.vm.$data).toMatchObject(expectedData);
  });
});
