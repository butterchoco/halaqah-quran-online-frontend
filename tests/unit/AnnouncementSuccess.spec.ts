import { shallowMount, createLocalVue } from "@vue/test-utils";
import AnnouncementSuccess from "@/views/AnnouncementSuccess.vue";
import bootstrap from "bootstrap-vue"
import Vuex from "vuex"
import Store from "./services/dummystore"

const localVue = createLocalVue()
localVue.use(bootstrap)
localVue.use(Vuex)

describe("AnnouncementSuccess.vue", () => {
  const store = new Vuex.Store(Store)
  it("renders data when passed", () => {
    function data() {
      return {
        img: require("@/assets/img/success-selection.png"),
        title: "Selamat Anda Lulus Program!",
        isPrimary: true,
        isDanger: false,
        isLihatNilai: false,
        msg: "Silahkan pilih jadwal untuk melanjutkan.",
        msg2: "",
        regisEvaluation: {},
        goto: [{ str: "Pilih Jadwal", link: "/" }]
      }
    }

    const wrapper = shallowMount(AnnouncementSuccess, {
      localVue,
      store
    });
    expect(wrapper.vm.$data).toMatchObject(data());
  });

});
