import { shallowMount } from "@vue/test-utils";
import Store from "@/store/index.ts";
import RegistrationSuccess from "@/views/RegistrationSuccess.vue";

describe("RegistrationSuccess.vue", () => {
  const store = Store;
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
