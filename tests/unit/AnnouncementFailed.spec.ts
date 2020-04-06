import { shallowMount, createLocalVue } from "@vue/test-utils";
import AnnouncementFailed from "@/views/AnnouncementFailed.vue";
import Vuex from 'vuex'
import Store from './services/dummystore'
import bootstrap from "bootstrap-vue"

const localVue = createLocalVue()
localVue.use(bootstrap)
localVue.use(Vuex)

describe("AnnouncementFailed.vue", () => {

  const store = new Vuex.Store(Store)
  const wrapper = shallowMount(AnnouncementFailed, {
    store,
    localVue,
    stubs: ["MessagePage"]
  });

  it("renders data when passed", () => {
    function data() {
      return {
        img: require("@/assets/img/failed-selection.png"),
        title: "Mohon Maaf Anda Belum Lulus Program!",
        isDanger: true,
        isPrimary: false,
        isLihatNilai: true,
        msg: "Kami sarankan untuk tahsin dulu ya kak :)",
        msg2: "Level tahsin yang sesuai adalah",
        level: "2",
        regisEvaluation: {
          evaluator: "Bob Bobby",
          report: [
            {
              title: "Kesalahan Harakat",
              content: 2
            },
            {
              title: "Kesalahan Panjang Pendek",
              content: 2
            },
            {
              title: "Kesalahan Gunnah",
              content: 2
            }
          ],
          note: "Lorem Ipsum"
        },
        goto: []
      }
    }
    expect(wrapper.vm.$data).toMatchObject(data());
  });

  it("show modal", async () => {
    wrapper.find(".score.btn").trigger("click")
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.modalShow).toBe(true)
  })

  it("hide modal", async () => {
    wrapper.find(".score.btn").trigger("click")
    wrapper.find(".close").trigger("click")
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.modalShow).toBe(false)
  })

});
