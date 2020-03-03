import SignInForm from "@/components/SignInForm.vue";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(VueRouter)

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
  it("render an error when username is not filled", async () => {
    const wrapper = factory({ username: "", password: "AzharDifa99" });
    wrapper.find({ ref: "btn-submit" }).trigger("click");
    await Vue.nextTick();
    expect(wrapper.find(".error_username").text()).toContain(
      "This field is required"
    );
  });
  it("render an error when password is not filled", async () => {
    const wrapper = factory({ username: "", password: "AZHARDIFAARNANDA" });
    wrapper.find({ ref: "btn-submit" }).trigger("click");
    await Vue.nextTick();
    expect(wrapper.find(".error_password").text()).toContain(
      "This field is required"
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
