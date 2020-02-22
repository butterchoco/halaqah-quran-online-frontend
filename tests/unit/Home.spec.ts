import { shallowMount } from "@vue/test-utils";
import Store from "@/store/index.ts";
import Home from "@/views/Home.vue";

describe("Home.vue", () => {
  const store = Store;
  const wrapper = shallowMount(Home, {
    store
  });
  it("has header description correctly", () => {
    const headerDescription =
      "Program tahfizh menggunakan aplikasi chat Whatsapp sebagai penghubung antara pembimbing dengan peserta. Keutamaan program ini adalah tidak hanya mengedepankan jumlah hafalan, melainkan juga kualitas hafalan yang baik bagi pesertanya karena dibimbing langsung oleh para ustadz dan ustadzah.";
    expect(wrapper.vm.$store.getters.getHeaderDescription).toBe(
      headerDescription
    );
  });
  it("has curriculum correctly", () => {
    const curriculumDescription =
      "Kurikulum yang digunakan pada program ini diadopsi dari Pesantren Tahfizh Qur’an Al-Utsmani dengan penyesuaian. Selain itu, pembimbing program ini adalah ustadz dan ustadzah lulusan Pesantren Tahfizh Qur’an Al-Utsmani. Lebih jelas mengenai kurikulum, pembimbing dan timeline Program Tahfizh Online Qaaf dapat diunduh disini";
    expect(wrapper.vm.$store.getters.getCurriculumDescription).toBe(
      curriculumDescription
    );
  });
  it("has timeline correctly", () => {
    expect(wrapper.vm.$store.getters.getTimeline.exist()).toBe(true);
  });
  it("has IsProgramOpened correctly", () => {
    expect(wrapper.vm.$store.getters.getIsProgramOpened.exist()).toBe(true);
  });
  it("has AllCurriculum correctly", () => {
    expect(wrapper.vm.$store.getters.getAllCurriculum.exist()).toBe(true);
  });
  it("has AllTeacher correctly", () => {
    expect(wrapper.vm.$store.getters.getAllTeacher.exist()).toBe(true);
  });
});
