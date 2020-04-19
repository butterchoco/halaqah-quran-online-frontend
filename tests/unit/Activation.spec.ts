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
    const wrapper: any = shallowMount(Activation, {
        mocks: {
            $route
        },
        stubs: {
            "b-img": BImg,
            "b-button": BButton
        }
    })
    it("test data is empty for the first time", () => {
        const data = {
            img: "",
            title: "",
            msg: "",
            isPrimary: false,
            isDanger: true,
            goto: [{
                str: "",
                link: ""
            }]
        }
        expect(wrapper.vm.$data).toMatchObject(data)
    })

    it("test data is activated when isActivated method called", async () => {
        const data = {
            img: require("@/assets/img/success-selection.png"),
            title: "Selamat akun anda sudah aktif!",
            isPrimary: true,
            isDanger: false,
            msg: "Silahkan login untuk melanjutkan menggunakan aplikasi",
            goto: [{ str: "Go to login page", link: "/sign/in" }],
        }
        wrapper.vm.isActivated()
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.$data).toMatchObject(data)
    })

    it("test data is expired when isExpired method called", async () => {
        const data = {
            img: require("@/assets/img/failed-selection.png"),
            title: "Link aktivasi akun expired",
            isPrimary: false,
            isDanger: true,
            msg: "Silahkan kirim ulang verifikasi email",
            goto: [{ str: "Resend Verification", link: "#" }],
        }
        wrapper.vm.isExpired()
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.$data).toMatchObject(data)
    })
})