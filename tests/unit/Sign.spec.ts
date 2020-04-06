import Sign from "@/views/Sign.vue"
import { shallowMount } from "@vue/test-utils"
import { BContainer, BRow, BCol, BImg } from "bootstrap-vue"
import router from "@/router/index.ts";

describe("Sign.vue", () => {
    it("test data is correct", () => {
        const data = {
            inputWidth: 0
        }
        const wrapper = shallowMount(Sign, {
            router,
            stubs: {
                "b-container": BContainer,
                "b-row": BRow,
                "b-col": BCol,
                "b-img": BImg,
            },
        })
        expect(wrapper.vm.$data).toMatchObject(data)
    })
})