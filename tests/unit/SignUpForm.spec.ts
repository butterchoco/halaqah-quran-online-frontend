import { shallowMount, createLocalVue } from "@vue/test-utils";
import SignUpForm from "@/components/SignUpForm.vue";
import Vue from "vue";
import flushPromises from "flush-promises";
import BootstrapVue from "bootstrap-vue";
import Vuelidate from "vuelidate";
import VueRouter from "vue-router";
import routes from "./services/dummyRouter"

jest.mock("axios");
const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuelidate)
localVue.use(VueRouter)
const router = new VueRouter({ routes })
const factory = (values = {}) => {
  return shallowMount(SignUpForm, {
    data() {
      return {
        show: true,
        isLoggedin: false,
        form: {
          ...values
        }
      };
    },
    localVue,
    router
  });
};

describe("SignUpForm.vue", () => {
  it("call registrationSuccess method and change the data", async () => {
    function data() {
      return {
        modal: {
          title: "Pendaftaran Berhasil !",
          image: require("@/assets/img/success-email.png"),
          message: "supri telah bergabung di hafidzisme",
          trailingMessage: "Silahkan cek email untuk aktivasi akun!",
          button: "Go to login page",
          isSuccess: true,
        }
      }
    }
    const wrapper: any = shallowMount(SignUpForm, {
      localVue,
    })
    wrapper.vm.registrationSuccess("supri")
    expect(wrapper.vm.$data.modal).toMatchObject(data().modal)
  });

  it("call registrationFailure method and change the data", async () => {
    function data() {
      return {
        modal: {
          title: "Pendaftaran Gagal !",
          image: require("@/assets/img/success-selection.png"),
          message: "test",
          trailingMessage: "test2",
          button: "Coba Lagi",
          isSuccess: false,
        }
      }
    }
    const wrapper: any = shallowMount(SignUpForm, {
      localVue,
    })
    wrapper.vm.registrationFailure("test", "test2")
    expect(wrapper.vm.$data.modal).toMatchObject(data().modal)
  });

  it("call hideModal method", async () => {
    const wrapper: any = shallowMount(SignUpForm, {
      localVue,
    })
    wrapper.vm.hideModal()
  });

  it("call onSubmit method", async () => {
    const wrapper: any = shallowMount(SignUpForm, {
      localVue,
    })
    wrapper.vm.onSubmit()
  });

  it("call toSignin method", async () => {
    const wrapper: any = shallowMount(SignUpForm, {
      localVue,
    })
    wrapper.vm.toSignin()
  });

  it("call postForm method", async () => {
    const wrapper: any = shallowMount(SignUpForm, {
      localVue,
    })
    wrapper.vm.postForm()
  });
});

describe("Username Test", () => {
  it("renders an error when username contains forbidden characters", async () => {
    const wrapper = factory({ username: "azhar*difa*arnanda" });
    wrapper.find({ ref: "btn-submit" }).trigger("click");
    await Vue.nextTick();
    expect(wrapper.find(".error_username").text()).toContain(
      "You can use letters, numbers, and _"
    );
  });
  it("renders an error when username character is less than 1", async () => {
    const wrapper = factory({ username: "" });
    wrapper.find({ ref: "btn-submit" }).trigger("click");
    await Vue.nextTick();
    expect(wrapper.find(".error_username").text()).toContain(
      "You can use letters, numbers, and _"
    );
  });
  it("renders an error when username character is more than 150", async () => {
    const wrapper = factory({ username: "a".repeat(151) });
    wrapper.find({ ref: "btn-submit" }).trigger("click");
    await Vue.nextTick();
    expect(wrapper.find(".error_username").text()).toContain(
      "You can use letters, numbers, and _"
    );
  });
  it("does not render an error when username match with rules", async () => {
    const wrapper = factory({ username: "azhar_difa_arnanda" });
    wrapper.find({ ref: "btn-submit" }).trigger("click");
    await Vue.nextTick();
    expect(wrapper.find(".error_username").text()).toContain("");
  });
});

describe("FullName Test", () => {
  it("renders an error when full name is not letter only", async () => {
    const wrapper = factory({ fullname: "Azhar Difa 99 @$" });
    wrapper.find({ ref: "btn-submit" }).trigger("click");
    await Vue.nextTick();
    expect(wrapper.find(".error_fullname").text()).toContain(
      "Requires first and last name"
    );
  });

  it("renders an error when first name is more than 30 characters", async () => {
    const wrapper = factory({ fullname: "a".repeat(31) + "difa" });
    wrapper.find({ ref: "btn-submit" }).trigger("click");
    await Vue.nextTick();
    expect(wrapper.find(".error_fullname").text()).toContain(
      "Requires first and last name"
    );
  });

  it("renders an error when last name is more than 150 characters", async () => {
    const wrapper = factory({ fullname: "azhar" + "a".repeat(151) });
    wrapper.find({ ref: "btn-submit" }).trigger("click");
    await Vue.nextTick();
    expect(wrapper.find(".error_fullname").text()).toContain(
      "Requires first and last name"
    );
  });

  it("does not render an error when full name match with rules", async () => {
    const wrapper = factory({ fullname: "Azhar Difa Arnanda" });
    wrapper.find({ ref: "btn-submit" }).trigger("click");
    await Vue.nextTick();
    expect(wrapper.find(".error_fullname").text()).toContain("");
  });
});

// Number Test
describe("Number Test", () => {
  it("renders an error when number is not integer only", async () => {
    const wrapper = factory({ number: "azhar*/" });
    wrapper.find({ ref: "btn-submit" }).trigger("click");
    await Vue.nextTick();
    expect(wrapper.find(".error_number").text()).toContain(
      "Please enter a valid number"
    );
  });
  it("render an error when number less than 10 character", async () => {
    const wrapper = factory({ number: parseInt("1".repeat(9)) });
    wrapper.find({ ref: "btn-submit" }).trigger("click");
    await Vue.nextTick();
    expect(wrapper.find(".error_number").text()).toContain(
      "Please enter a valid number"
    );
  });
  it("renders an error when number more than 20 character", async () => {
    const wrapper = factory({ number: parseInt("1".repeat(21)) });
    wrapper.find({ ref: "btn-submit" }).trigger("click");
    await Vue.nextTick();
    expect(wrapper.find(".error_number").text()).toContain(
      "Please enter a valid number"
    );
  });
  it("doesn't render an error when number is match with rules", async () => {
    const wrapper = factory({ number: parseInt("082115917118") });
    wrapper.find({ ref: "btn-submit" }).trigger("click");
    await Vue.nextTick();
    expect(wrapper.find(".error_number").text()).toContain("");
  });
});

describe("Email Test", () => {
  it("renders an error when email format is not correct", async () => {
    const wrapper = factory({ email: "aazhard*gmail.com" });
    wrapper.find({ ref: "btn-submit" }).trigger("click");
    await Vue.nextTick();
    expect(wrapper.find(".error_email").text()).toContain(
      "Please enter a valid email address"
    );
  });
  it("doesn't render an error when email is match with rules", async () => {
    const wrapper = factory({ email: "aazhard8@gmail.com" });
    wrapper.find({ ref: "btn-submit" }).trigger("click");
    await Vue.nextTick();
    expect(wrapper.find(".error_email").text()).toContain("");
  });
});

describe("Password Test", () => {
  it("renders an error when password doesn't contain atleast 8 characters", async () => {
    const wrapper = factory({ password: "azhar" });
    wrapper.find({ ref: "btn-submit" }).trigger("click");
    await Vue.nextTick();
    expect(wrapper.find(".error_password").text()).toContain(
      "Please enter a valid password"
    );
  });
  it("renders an error when password doesn't contain atleast one lowercase", async () => {
    const wrapper = factory({ password: "AZHARDIFA" });
    wrapper.find({ ref: "btn-submit" }).trigger("click");
    await Vue.nextTick();
    expect(wrapper.find(".error_password").text()).toContain(
      "Please enter a valid password"
    );
  });
  it("renders an error when password doesn't contain atleast one uppercase", async () => {
    const wrapper = factory({ password: "azhardifa" });
    wrapper.find({ ref: "btn-submit" }).trigger("click");
    await Vue.nextTick();
    expect(wrapper.find(".error_password").text()).toContain(
      "Please enter a valid password"
    );
  });
  it("renders an error when password doesn't contain atleast one number", async () => {
    const wrapper = factory({ password: "AzharDifa" });
    wrapper.find({ ref: "btn-submit" }).trigger("click");
    await Vue.nextTick();
    expect(wrapper.find(".error_password").text()).toContain(
      "Please enter a valid password"
    );
  });
  it("doesn't renders an error when password match with rules", async () => {
    const wrapper = factory({ password: "AzharDifa99" });
    wrapper.find({ ref: "btn-submit" }).trigger("click");
    await Vue.nextTick();
    expect(wrapper.find(".error_password").text()).toContain("");
  });
});

describe("Password validation test", () => {
  it("renders an error when password validation doesn't match", async () => {
    const wrapper = factory({
      password: "AzharDifa99",
      passwordValidation: "AzharDifa88"
    });
    wrapper.find({ ref: "btn-submit" }).trigger("click");
    await Vue.nextTick();
    expect(wrapper.find(".error_password_validation").text()).toContain(
      "Confirm password must match"
    );
  });
  it("doesn't renders an error when password validation is match", async () => {
    const wrapper = factory({
      password: "AzharDifa99",
      passwordValidation: "AzharDifa99"
    });
    wrapper.find({ ref: "btn-submit" }).trigger("click");
    await Vue.nextTick();
    expect(wrapper.find(".error_password_validation").text()).toContain("");
  });
});

describe("Logged In Test", () => {
  it("logged in if form is valid", async () => {
    const wrapper = factory({
      username: "azhar_difa_arnanda",
      fullname: "Azhar Difa Arnanda",
      number: parseInt("082115917118"),
      email: "aazhard8@gmail.com",
      password: "AzharDifa99",
      passwordValidation: "AzharDifa99"
    });
    wrapper.find({ ref: "btn-submit" }).trigger("click");
    await flushPromises();
    expect(wrapper.vm.$data.isLoggedin).toBeFalsy();
  });
  it("logged in if form is invalid", async () => {
    const wrapper = factory({
      username: "azhar*difa*arnanda",
      fullname: "Azhar Difa 99 @$",
      number: "azhar*/",
      email: "aazhard8*gmail.com",
      password: "azhar",
      passwordValidation: "bowo"
    });
    wrapper.find({ ref: "btn-submit" }).trigger("click");
    await flushPromises();
    expect(wrapper.vm.$data.isLoggedin).toBeFalsy();
  });
});
