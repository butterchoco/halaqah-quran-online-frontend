import { shallowMount, createLocalVue } from "@vue/test-utils"
import StudentSchedule from "@/views/StudentSchedule.vue"
import BootstrapVue from "bootstrap-vue"

const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe("StudentSchedule.vue", () => {
    function data() {
        return {
            selectedDate: new Date().toISOString().split("T")[0],
            form: {
                date: new Date().toISOString().split("T")[0],
                time: new Date().toISOString().split("T")[1].split("Z")[0].split(".")[0],
                teacher: "Dr. Drake"
            },
            availableDate: [
                {
                    date: new Date().toISOString().split("T")[0],
                    time: new Date().toTimeString(),
                    teacher: "Ust. Drake"
                },
            ]
        }
    }
    let wrapper: any = shallowMount(StudentSchedule, {
        localVue,
        data
    })

    it("calls method addSelectedDate in StudentSchedule", () => {
        wrapper.vm.addSelectedDate()
        expect(wrapper.vm.$data.isModal).toBe(true)
    })

    it("calls method initiateDate when addSelectedDate called and selectedDate is empty string in StudentSchedule", () => {
        const initiateDate = jest.fn()
        wrapper = shallowMount(StudentSchedule, {
            localVue,
            methods: {
                initiateDate
            }
        })
        wrapper.vm.addSelectedDate()
        expect(initiateDate).toHaveBeenCalled()
    })

    it("calls method joinClass in StudentSchedule", () => {
        wrapper = shallowMount(StudentSchedule, {
            localVue,
            data
        })
        wrapper.vm.addSelectedDate()
        wrapper.vm.joinClass()
        expect(wrapper.vm.$data.listSelectedDate[wrapper.vm.$data.listSelectedDate.length - 1]).toStrictEqual(data().form)
    })

    it("calls method cancelJoin in StudentSchedule", () => {
        wrapper = shallowMount(StudentSchedule, {
            localVue,
            data
        })
        wrapper.vm.addSelectedDate()
        wrapper.vm.cancelJoin()
        expect(wrapper.vm.$data.listSelectedDate).toStrictEqual([])
    })
})