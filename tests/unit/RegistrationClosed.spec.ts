import { shallowMount } from "@vue/test-utils";
import Store from "@/store/index.ts";
import RegistrationClosed from "@/views/RegistrationClosed.vue";

describe("RegistrationClosed.vue", () => {
  const store = Store;
  let wrapper = shallowMount(RegistrationClosed, {
    store
  });

  it("renders data when passed", () => {
    let expectedData = {
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
