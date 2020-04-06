import { shallowMount } from "@vue/test-utils";
import RegistrationSelection from "@/views/RegistrationSelection.vue";
import store from "@/store/index.ts";

import { BRow, BCol, BImg, BButton, BModal } from "bootstrap-vue"

describe("RegistrationSelection.vue", () => {
  let wrapper = shallowMount(RegistrationSelection, {
    store,
    stubs: {
      "b-row": BRow,
      "b-col": BCol,
      "b-img": BImg,
      "b-button": BButton,
      "b-modal": BModal
    },
  })
  it("test data is correct", () => {
    const data = {
      isAccepted: false,
      img: "",
      title: "",
      msg: "",
      msgTrailing: "",
      msgButton: "",
      testResult: {
        name: "",
        harakatMistake: 0,
        madMistake: 0,
        gunnahMistake: 0,
        msg: ""
      }
    }
    expect(wrapper.vm.$data).toMatchObject(data)
  })
})
