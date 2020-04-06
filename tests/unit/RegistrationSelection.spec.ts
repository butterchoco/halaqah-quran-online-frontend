import { shallowMount, createLocalVue } from "@vue/test-utils";
import Announcement from "@/views/Announcement.vue";
import Store from "./services/dummystore";
import Vuex from "vuex"
import { BRow, BCol, BImg, BButton, BModal } from "bootstrap-vue"
const localVue = createLocalVue()
localVue.use(Vuex)

describe("Announcement.vue", () => {
  const store = new Vuex.Store(Store)
  function data() {
    return {
      img: require("@/assets/img/404-not-found.png"),
      title: "Tidak ada pengumuman",
      msg: "Silahkan menunggu beberapa hari lagi !",
      goto: [
        {
          link: "/",
          str: "Back to home"
        }
      ]
    }
  }
  const wrapper = shallowMount(Announcement, {
    store,
    data,
    stubs: {
      "b-row": BRow,
      "b-col": BCol,
      "b-img": BImg,
      "b-button": BButton,
      "b-modal": BModal
    },
  })
  it("test data is correct", () => {
    expect(wrapper.vm.$data).toMatchObject(data())
  })
})
