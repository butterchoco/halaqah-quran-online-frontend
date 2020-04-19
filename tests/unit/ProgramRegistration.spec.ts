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
  const createFormData = jest.fn()
  let wrapper: any = shallowMount(ProgramRegistration, {
    store,
    localVue,
    router,
    methods: {
      createFormData
    },
  });

  it("path change when condition true", async () => {
    store.commit("setPeriodCategory", {
      value: "registration"
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$store.getters.getRegistrationPeriodOpened).toBe(true)
  })

  it("path change when condition false", async () => {
    store.commit("setPeriodCategory", {
      value: "registration"
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$store.getters.getRegistrationPeriodOpened).toBe(true)
  })

  it("call touchForm method and get Error 1", async () => {
    function data() {
      return {
        form: {
          age: "12",
          domicile: "12",
          recording: new File(["test"], "test"),
          juzTargetNumber: "12",
          juzNumberMemorized: "12",
          hasTahsinExperience: 0,
          tahsinExperience: "test",
          infaqOptionNumber: 1,
          referralName1: "test",
          referralName2: "tesevr",
          programInfoReference: ["Line"],
          TermAndConditions: ["tnc1", "tnc2"],
        }
      }
    }
    wrapper = shallowMount(ProgramRegistration, {
      store,
      localVue,
      router,
      data,
      methods: {
        createFormData,
      },
    });
    wrapper.vm.touchForm()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$v.form.$anyError).toBe(true)
  })

  it("call touchForm method and get Error 2", async () => {
    function data() {
      return {
        form: {
          age: "12",
          domicile: "12",
          recording: new File(["test"], "test"),
          juzTargetNumber: "12",
          juzNumberMemorized: "12",
          hasTahsinExperience: 1,
          tahsinExperience: "test",
          infaqOptionNumber: 1,
          referralName1: "test",
          referralName2: "tesevr",
          programInfoReference: ["Line"],
          TermAndConditions: ["tnc1", "tnc2"],
        }
      }
    }
    wrapper = shallowMount(ProgramRegistration, {
      store,
      localVue,
      router,
      data,
      methods: {
        createFormData,
      },
    });
    wrapper.vm.touchForm()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$v.form.$anyError).toBe(true)
  })

  it("call touchForm method and get Error 3", async () => {
    function data() {
      return {
        form: {
          age: "12",
          domicile: "12",
          recording: new File(["test"], "test"),
          juzTargetNumber: "12",
          juzNumberMemorized: "12",
          hasTahsinExperience: 0,
          tahsinExperience: "test",
          infaqOptionNumber: 2,
          referralName1: "test",
          referralName2: "tesevr",
          programInfoReference: ["Line"],
          TermAndConditions: ["tnc1", "tnc2"],
        }
      }
    }
    wrapper = shallowMount(ProgramRegistration, {
      store,
      localVue,
      router,
      data,
      methods: {
        createFormData,
      },
    });
    wrapper.vm.touchForm()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$v.form.$anyError).toBe(true)
  })

  it("call touchForm method and get Error 4", async () => {
    function data() {
      return {
        form: {
          age: "12",
          domicile: "12",
          recording: new File(["test"], "test"),
          juzTargetNumber: "12",
          juzNumberMemorized: "12",
          hasTahsinExperience: 1,
          tahsinExperience: "test",
          infaqOptionNumber: 2,
          referralName1: "test",
          referralName2: "tesevr",
          programInfoReference: ["Line"],
          TermAndConditions: ["tnc1", "tnc2"],
        }
      }
    }
    wrapper = shallowMount(ProgramRegistration, {
      store,
      localVue,
      router,
      data,
      methods: {
        createFormData,
      },
    });
    wrapper.vm.touchForm()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$v.form.$anyError).toBe(true)
  })

  it("call postForm method", async () => {
    wrapper.vm.postForm()
    await wrapper.vm.$nextTick()
  })

  it("call onSubmit method", async () => {
    wrapper.vm.onSubmit()
    await wrapper.vm.$nextTick()
  })

  it("call validateRecording  method", async () => {
    wrapper.setData({ form: { recording: new File(["test"], "test.mp3") } })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.validateRecording).toBe(true)
  })

  it("call routerPushTo regis closed method", async () => {
    const routerPushTo = jest.fn()
    wrapper = shallowMount(ProgramRegistration, {
      store,
      localVue,
      router,
      methods: {
        routerPushTo
      },
    });
    store.commit("setProgramOpened", { value: true })
    store.commit("setHasProgramRegistered", { value: true })
    wrapper.vm.routerPushTo()
    await wrapper.vm.$nextTick()
    expect(routerPushTo).toHaveBeenCalled()
  })

  it("call routerPushTo regis success method", async () => {
    const routerPushTo = jest.fn()
    wrapper = shallowMount(ProgramRegistration, {
      store,
      localVue,
      router,
      methods: {
        routerPushTo
      },
    });
    store.commit("setHasProgramRegistered", { value: true })
    wrapper.vm.routerPushTo()
    await wrapper.vm.$nextTick()
    expect(routerPushTo).toHaveBeenCalled()
  })

  it("call routerPushTo regis closed method", async () => {
    const routerPushTo = jest.fn()
    wrapper = shallowMount(ProgramRegistration, {
      store,
      localVue,
      router,
      methods: {
        routerPushTo
      },
    });
    store.commit("setProgramOpened", { value: true })
    store.commit("setHasProgramRegistered", { value: false })
    store.commit("setUserRole", {
      role: [{
        "role_id": 4,
        "description": ""
      }]
    })
    wrapper.vm.routerPushTo()
    await wrapper.vm.$nextTick()
    expect(routerPushTo).toHaveBeenCalled()
  })

});
