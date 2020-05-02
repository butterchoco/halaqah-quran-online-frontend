import SignInForm from "@/components/SignInForm.vue";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import VueRouter from 'vue-router';
import Vuelidate from "vuelidate";

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(VueRouter);
localVue.use(Vuelidate);

const factory = (values = {}) => {
  return shallowMount(SignInForm, {
    data() {
      return {
        isLoading: false,
        show: true,
        form: {
          ...values
        }
      };
    },
    localVue
  });
};

describe("SignInForm.vue", () => {
  it("call postForm method", async () => {
    const wrapper: any = shallowMount(SignInForm, {
      localVue,
    })
    wrapper.vm.postForm()
  });

  it("call onSubmit method", async () => {
    const wrapper: any = shallowMount(SignInForm, {
      localVue,
    })
    wrapper.vm.onSubmit()
  });

  it("render an error when username is not filled", async () => {
    const wrapper = factory({ username: "", password: "AzharDifa99" });
    wrapper.find({ ref: "btn-submit" }).trigger("click");
    await Vue.nextTick();
    expect(wrapper.find(".error_username").text()).toContain(
      "Username is required"
    );
  });
  it("render an error when password is not filled", async () => {
    const wrapper = factory({ username: "", password: "AZHARDIFAARNANDA" });
    wrapper.find({ ref: "btn-submit" }).trigger("click");
    await Vue.nextTick();
    expect(wrapper.find(".error_password").text()).toContain(
      "Password is required"
    );
  });
  it("does not render an error when username and password is valid", async () => {
    const wrapper = factory({
      username: "azhar_difa_arnanda",
      password: "AzharDifa99"
    });
    wrapper.find({ ref: "btn-submit" }).trigger("click");
    await Vue.nextTick();
    expect(wrapper.find(".error_username").text()).toContain("");
    expect(wrapper.find(".error_password").text()).toContain("");
  });
});
