import { shallowMount, createLocalVue } from "@vue/test-utils";
import Store from "./services/dummystore";
import Home from "@/views/Home.vue";
import VueRouter from "vue-router";
import Vuex from "vuex"

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex)

describe("Home.vue", () => {
  const store = new Vuex.Store(Store)

  const wrapper = shallowMount(Home, {
    store,
    localVue
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
    expect(wrapper.vm.$store.getters.getTimeline).toBeTruthy();
  });
  it("has IsProgramOpened correctly", async () => {
    store.commit("setPeriodCategory", {
      value: "registration"
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$store.getters.getRegistrationPeriodOpened).toBeTruthy();
  });
  it("has AllCurriculum correctly", () => {
    expect(wrapper.vm.$store.getters.getAllCurriculums).toBeTruthy();
  });
  it("has AllTeacher correctly", () => {
    expect(wrapper.vm.$store.getters.getAllTeachers).toBeTruthy();
  });
});
