import { shallowMount, createLocalVue } from "@vue/test-utils";
import Modal from "@/components/Modal.vue";

describe("Modal", () => {
  const prop = {
    isDanger: true,
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
  const toggleModal = jest.fn();
  const wrapper = shallowMount(Modal, {
    propsData: prop,
    methods: {
      toggleModal
    }
  });

  it("renders data when passed", () => {
    wrapper.find(".close-btn").trigger("click");
    wrapper.vm.$nextTick();
    expect(wrapper.props().isDanger).toBe(true);
  });
});
