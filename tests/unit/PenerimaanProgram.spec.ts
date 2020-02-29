import { shallowMount } from "@vue/test-utils";
import PenerimaanProgram from "@/views/PenerimaanProgram.vue";

describe("PenerimaanPage.vue", () => {
  it("renders data when passed", () => {
    function data() {
      return {
        img: require("@/assets/img/success-selection-1.png"),
        title: "Selamat Anda Lulus Program!",
        msg: "Silahkan pilih jadwal untuk melanjutkan."
      };
    }
    const wrapper = shallowMount(PenerimaanProgram);
    expect(wrapper.vm.$data).toMatchObject(data());
  });
});
