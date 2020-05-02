import { shallowMount, createLocalVue } from "@vue/test-utils"
import TeacherSchedule from "@/views/TeacherSchedule.vue"
import Store from "./services/dummystore"
import BootstrapVue from "bootstrap-vue"
import Vuex from "vuex"

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(Vuex)

describe("TeacherSchedule.vue", () => {
    function data() {
        return {
            selectedDate: "2020-04-03",
            form: {
                date: "2020-04-03",
                detail: {
                    id: 1,
                    time: "22:45:70 AM",
                    teacher: {
                        "first_name": "Ahmad",
                        "last_name": "supri"
                    },
                    student: null
                }
            },
            availableDate: {
                "2020-04-03": [{
                    id: 1,
                    time: "22:45:70 AM",
                    teacher: {
                        "first_name": "Ahmad",
                        "last_name": "supri"
                    },
                    student: null
                }]
            }
        }
    }
    const store = new Vuex.Store(Store)
    let wrapper: any = shallowMount(TeacherSchedule, {
        localVue,
        store,
        data
    })

    it("calls method addSelectedDate in TeacherSchedule", () => {
        wrapper.vm.addSelectedDate()
        expect(wrapper.vm.$data.isAddScheduleModal).toBe(true)
    })

    it("calls method initiateDate when addSelectedDate called and selectedDate is empty string in TeacherSchedule", () => {
        const printAvailableDate = jest.fn()
        wrapper = shallowMount(TeacherSchedule, {
            localVue,
            store,
            methods: {
                printAvailableDate
            }
        })
        wrapper.vm.addSelectedDate()
        expect(printAvailableDate).toHaveBeenCalled()
    })

    it("calls method cancelJoin in TeacherSchedule", () => {
        wrapper = shallowMount(TeacherSchedule, {
            localVue,
            store,
            data
        })
        wrapper.vm.addSelectedDate()
        wrapper.vm.cancelJoin()
        expect(wrapper.vm.$data.listSelectedDate).toStrictEqual([])
    })
})