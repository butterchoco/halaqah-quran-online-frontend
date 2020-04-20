import { shallowMount, createLocalVue } from "@vue/test-utils";
import Store from "@/store/index.ts";
import Transaction from "@/views/Transaction.vue";
import VueRouter from "vue-router";
import BootstrapVue from 'bootstrap-vue';
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe("Transaction.vue", () => {
  const store = Store;
  let wrapper: any;

  it("redirect to login forbidden page when not logged in",async () => {
    const gotoLoginForbidden = jest.fn();
    store.commit("setUserRole", {
      role: [
        {
          "role_id": 0,
          "description": "student_selector"
        }
      ]
    })
    wrapper = shallowMount(Transaction, {
      localVue,
      store,
      methods: {
        gotoLoginForbidden
      },
      stubs: ["router-link", "router-view"]
    });
    await wrapper.vm.$nextTick()
    expect(gotoLoginForbidden).toHaveBeenCalled()
  });

  it("call gotoLoginForbidden method", async () => {
    wrapper = shallowMount(Transaction, {
      localVue,
      store,
      stubs: ["router-link", "router-view"]
    })
    wrapper.vm.gotoLoginForbidden()
    await wrapper.vm.$nextTick()
  })

  it("redirect gotoForbiddenPage when role is not student", async () => {
    const gotoForbiddenPage = jest.fn()
    store.commit("setUserRole", {
      role: [
        {
          "role_id": 5,
          "description": "bobby"
        }
      ]
    })
    wrapper = shallowMount(Transaction, {
      localVue,
      store,
      methods: {
        gotoForbiddenPage
      }
    })
    await wrapper.vm.$nextTick()
    expect(gotoForbiddenPage).toHaveBeenCalled()
  })

  it("call gotoForbiddenPage method", async () => {
    wrapper = shallowMount(Transaction, {
      localVue,
      store,
      stubs: ["router-link", "router-view"]
    })
    wrapper.vm.gotoForbiddenPage()
    await wrapper.vm.$nextTick()
  })

  it("call getDataPembayaran after sudent login", async () => {
    const getDataPembayaran = jest.fn();
    store.commit("setUserRole", {
      role: [
        {
          "role_id": 2,
          "description": "student"
        }
      ]
    })
    wrapper = shallowMount(Transaction, {
      localVue,
      store,
      methods: {
        getDataPembayaran
      }
    })
    await wrapper.vm.$nextTick()
    expect(getDataPembayaran).toHaveBeenCalled()
  })

  it("render page when file has uploaded and payment accepted", async () => {
    store.commit("setUserRole", {
      role: [
        {
          "role_id": 2,
          "description": "student"
        }
      ]
    })

    function data() {
      return {
        isPaymentAccepted: true,
        isUploaded: true,
      }
    }
    wrapper = shallowMount(Transaction, {
      localVue,
      store,
      data
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find("h1").text()).toMatch(
      "Pembayaran terverifikasi!"
    );
  })

  it("render page when file has uploaded but payment rejected", async () => {
    store.commit("setUserRole", {
      role: [
        {
          "role_id": 2,
          "description": "student"
        }
      ]
    })

    function data() {
      return {
        isPaymentAccepted: false,
        isUploaded: true,
      }
    }
    wrapper = shallowMount(Transaction, {
      localVue,
      store,
      data
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find("b-alert-stub").text()).toMatch(
      "Bukti pembayaran tidak valid. Tolong upload bukti yang valid."
    );
    expect(wrapper.find("h3").text()).toMatch(
      "Pembayaran Infaq"
    );
  })

  it("render page when file not uploaded and payment null", async () => {
    store.commit("setUserRole", {
      role: [
        {
          "role_id": 2,
          "description": "student"
        }
      ]
    })

    function data() {
      return {
        isPaymentAccepted: null,
        isUploaded: false,
      }
    }
    wrapper = shallowMount(Transaction, {
      localVue,
      store,
      data
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find("h3").text()).toMatch(
      "Pembayaran Infaq"
    );
  })

  it("render page when file has uploaded and wait for verification", async () => {
    store.commit("setUserRole", {
      role: [
        {
          "role_id": 2,
          "description": "student"
        }
      ]
    })

    function data() {
      return {
        isPaymentAccepted: null,
        isUploaded: true,
      }
    }
    wrapper = shallowMount(Transaction, {
      localVue,
      store,
      data
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find("h1").text()).toMatch(
      "Tunggu beberapa saat..."
    );
  })

  it("call onSubmit method", async () => {
    wrapper.vm.onSubmit()
    await wrapper.vm.$nextTick()
  })

  it("call uploadTransaction method", async () => {
    wrapper.vm.uploadTransaction()
    await wrapper.vm.$nextTick()
  })

  it("call validateTransaction method when file extension is allowed", async () => {
    wrapper.setData({ form: { transactionImg: new File(["test"], "test.png") } })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.validateTransaction).toBe(true)
  })

  it("doesn't call validateTransaction method when file extension isn't allowed", async () => {
    wrapper.setData({ form: { transactionImg: new File(["test"], "test.wav") } })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.validateTransaction).toBe(false)
  })
  
  it("call copyText method", async () => {
    const copyText = jest.fn()
    store.commit("setUserRole", {
      role: [
        {
          "role_id": 2,
          "description": "student"
        }
      ]
    })

    function data() {
      return {
        isPaymentAccepted: null,
        isUploaded: false,
      }
    }
    wrapper = shallowMount(Transaction, {
      localVue,
      store,
      data,
      methods: {
        copyText
      }
    })
    wrapper.find({ref: "salin-norek"}).trigger("click")
    expect(copyText).toHaveBeenCalled()
  })

});
