import { shallowMount } from "@vue/test-utils";
import Store from "@/store/index.ts";
import PengumumanPage from "@/views/PengumumanPage.vue";

describe("PengumumanPage.vue", () => {
  const store = Store;
  let wrapper = shallowMount(PengumumanPage, {
    store
  });

  it("has IsAccepted true", () => {
    expect(wrapper.vm.$store.getters.getIsAccepted).toBeTruthy();
  });

  it("renders data when passed", () => {
    let expectedData = {
      img: require("@/assets/img/maintenance.png"),
      msg: "Silahkan pilih jadwal untuk melanjutkan.",
      title: "Selamat Anda Lulus Program!",
      goto: [{ str: "Pilih Jadwal", link: "/" }]
    };
    expect(wrapper.vm.$data).toMatchObject(expectedData);
  });

  it("has IsAccepted false", () => {
    wrapper.vm.$store.commit("setAccepted", { value: false });
    expect(wrapper.vm.$store.getters.getIsAccepted).toBeFalsy();
  });

  it("renders data when passed", () => {
    function data() {
      if (wrapper.vm.$store.getters.getIsAccepted) {
        return {
          img: require("@/assets/img/success-selection-1.png"),
          title: "Selamat Anda Lulus Program!",
          msg: "Silahkan pilih jadwal untuk melanjutkan.",
          goto: [{ str: "Pilih Jadwal", link: "/" }]
        };
      } else {
        return {
          img: require("@/assets/img/failed-selection.png"),
          title: "Mohon Maaf Anda Belum Lulus Program!",
          msg: "Kami sarankan untuk tahsin dulu ya kak :)",
          msg2: "Level tahsin yang sesuai adalah Level 2",
          goto: [{ str: "Lihat Nilai", link: "/" }]
        };
      }
    }
    wrapper = shallowMount(PengumumanPage, {
      store,
      data
    });

    const expectedData = {
      img: require("@/assets/img/failed-selection.png"),
      title: "Mohon Maaf Anda Belum Lulus Program!",
      msg: "Kami sarankan untuk tahsin dulu ya kak :)",
      msg2: "Level tahsin yang sesuai adalah Level 2",
      goto: [{ str: "Lihat Nilai", link: "/" }]
    };

    wrapper.vm.$store.commit("setAccepted", { value: false });
    expect(wrapper.vm.$data).toMatchObject(expectedData);
  });
});
