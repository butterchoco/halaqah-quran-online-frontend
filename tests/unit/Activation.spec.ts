import { shallowMount } from "@vue/test-utils"
import Activation from "@/views/Activation.vue"
import { BImg, BButton } from "bootstrap-vue"

describe("Activation.vue", () => {
    const $route = {
        params: {
            uid: 1,
            token: 2
        }
    }
    const wrapper = shallowMount(Activation, {
        mocks: {
            $route
        },
        stubs: {
            "b-img": BImg,
            "b-button": BButton
        }
    })
    it("test data is correct", () => {
        const data = {
            img: "",
            title: "",
            msg: "",
            msgButton: ""
        }
        expect(wrapper.vm.$data).toMatchObject(data)
    })
})