import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Store from "@/store/index.ts";
import MessagePage from "@/components/MessagePage.vue";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);
describe("MessagePage Data", () => {
  const store = Store;
  let wrapper = mount(MessagePage, {
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
    wrapper = mount(MessagePage, {
      propsData: prop,
      localVue,
      stubs: ["router-link", "router-view"]
    });
    expect(wrapper.props()).toMatchObject(prop);
  });

  it("can call toggle modal", () => {
    const prop = {
      isDanger: true,
      isPrimary: false,
      msg: "this is a message",
      title: "this is a title",
      img: require("@/assets/img/success-selection-1.png"),
      goto: [
        {
          link: "/",
          str: "Pilih Jadwal"
        }
      ],
      dataModal: {
        evaluator: "Bob Bobby",
        report: [
          {
            title: "Kesalahan Harakat",
            content: 2
          },
          {
            title: "Kesalahan Panjang Pendek",
            content: 2
          },
          {
            title: "Kesalahan Gunnah",
            content: 2
          }
        ]
      }
    };
    function data() {
      return {
        isModal: false
      };
    }

    const toggleModal = jest.fn();
    toggleModal.apply(data);
    wrapper = shallowMount(MessagePage, {
      propsData: prop,
      data: data,
      store,
      localVue,
      stubs: ["router-link", "router-view"]
    });
    wrapper.vm.$store.commit("setAccepted", { value: false });
    wrapper.vm.$nextTick();
    const button = wrapper.find("button.btn");
    button.trigger("click");
    expect(wrapper.props()).toMatchObject(prop);
  });
});
