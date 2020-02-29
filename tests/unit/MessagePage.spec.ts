import { shallowMount, createLocalVue } from "@vue/test-utils";
import MessagePage from "@/components/MessagePage.vue";
import VueRouter from "vue-router";
import Store from "@/store/index.ts";

const localVue = createLocalVue();
localVue.use(VueRouter);
describe("MessagePage Data", () => {
  const store = Store;
  let wrapper = shallowMount(MessagePage, {
    localVue,
    store
  });
  it("renders data when passed", () => {
    const prop = {
      msg: "this is a message",
      title: "this is a title",
      img: require("@/assets/img/success-selection-1.png"),
      goto: [
        {
          link: "/",
          str: "Pilih Jadwal"
        }
      ]
    };
    wrapper = shallowMount(MessagePage, {
      propsData: prop,
      localVue,
      store,
      stubs: ["router-link", "router-view"]
    });
    expect(wrapper.props()).toMatchObject(prop);
  });
});
