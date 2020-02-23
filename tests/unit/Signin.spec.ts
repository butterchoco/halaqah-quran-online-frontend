import { shallowMount } from "@vue/test-utils"
import Signin from "@/views/Signin.vue"

const factory = (values = {}) => {
    return shallowMount(Signin, {
        data() {
            return {
                ...values
            }
        }
    })
}

describe("Signin.vue", () => {
    it("render an error when username is not exists", () => {
        const wrapper = factory({username: "invalidusername", password: "AzharDifa99"})
        expect(wrapper.find(".error_signin").exists()).toBeTruthy()
    })
    it("render an error when password is not valid", () => {
        const wrapper = factory({username: "azhar_difa_arnanda", password: "AZHARDIFAARNANDA"})
        expect(wrapper.find(".error_signin").exists()).toBeTruthy()
    })
    it("does not render an error when username and password is valid", () => {
        const wrapper = factory({username: "azhar_difa_arnanda", password: "AzharDifa99"})
        expect(wrapper.find(".error_signin").exists()).toBeFalsy()
    })
})