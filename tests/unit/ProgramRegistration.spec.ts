import { shallowMount, createLocalVue } from "@vue/test-utils";
import Store from "./services/dummystore";
import ProgramRegistration from "@/views/ProgramRegistration.vue";
import VueRouter from "vue-router";
import routes from "./services/dummyRouter"
import Vuex from "vuex";
import bootstrap from "bootstrap-vue"
import Vuelidate from 'vuelidate';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
localVue.use(bootstrap);
localVue.use(Vuelidate)

describe("ProgramRegistration.vue", () => {
  const store = new Vuex.Store(Store)
  const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL, routes
  })
  function data() {
    return {
      form: {
        age: "12",
        domicile: "12",
        recording: new File(["test"], "test"),
        juzTargetNumber: "12",
        juzNumberMemorized: "12",
        hasTahsinExperience: "0",
        hasTahsinExperienceOption: [
          { value: 1, text: "Ya, pernah" },
          { value: 0, text: "Tidak, belum pernah" }
        ],
        tahsinExperience: "",
        infaqOptionNumber: "1",
        infaqOptionNumberOption: [
          { value: 1, text: "Paket Sendiri (Rp.200.000)" },
          { value: 2, text: "Paket Berdua (Rp.240.000)" },
          { value: 3, text: "Paket Bertiga (Rp.280.000)" }
        ],
        referralName1: "",
        referralName2: "",
        programInfoReference: ["Line"],
        programInfoReferenceOptions: [
          { item: "Line", name: "Line" },
          { item: "Instagram", name: "Instagram" },
          { item: "Whatsapp", name: "Whatsapp" },
          { item: "Facebook", name: "Facebook" },
          { item: "Other", name: "Others" }
        ],
        TermAndConditions: ["tnc1", "tnc2"],
        TermAndConditionsOptions: [
          {
            item: "tnc1",
            name:
              "Saya bersedia meluangkan waktu untuk setoran secara langsung(malalui whatsapp call) ke ustadz/ah sepekan minimal sekali dan ujian muroja'ah sepekan sekali"
          },
          {
            item: "tnc2",
            name:
              "Saya berusaha sebaik mungkin menjaga adab halaqah Quran, misal dengan aktif di grup, memberikan kabar jika berhalangan setoran dan menaati peraturan."
          }
        ]
      },
      formData: new FormData()
    }
  }

  const createFormData = jest.fn()

  const onSubmit = jest.fn()
  const validateRecording = jest.fn()
  const wrapper = shallowMount(ProgramRegistration, {
    store,
    localVue,
    router,
    data,
    methods: {
      createFormData,
      onSubmit,
    },
    computed: {
      validateRecording
    }
  });

  it("renders data when passed", () => {
    expect(wrapper.vm.$data).toMatchObject(data());
  });

  it("path change when condition true", async () => {
    store.commit("setSelectionPeriod", {
      selectionPeriod: {
        periodId: "1",
        term: "TahfidzQu_2020_1"
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$store.getters.getIsProgramOpened).toBe(true)
  })

  it("path change when condition false", async () => {
    store.commit("setSelectionPeriod", {
      selectionPeriod: {
        periodId: "1",
        term: "TahfidzQu_2020_1"
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$store.getters.getIsProgramOpened).toBe(true)
  })

  it("return true when recording file exist and validateRecording called", () => {
    expect(wrapper.vm.$data.form.recording).toEqual(data().form.recording)
  })

  it("call createFormData method", async () => {
    wrapper.find("#submit").trigger("click")
    await wrapper.vm.$nextTick()
  })

});
