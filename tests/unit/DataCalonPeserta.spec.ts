import { shallowMount, createLocalVue } from "@vue/test-utils";
import Store from "@/store/index.ts";
import DataCalonPeserta from "@/views/DataCalonPeserta.vue";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);
describe("Data Calon Peserta", () => {
  const store = Store;
  let wrapper = shallowMount(DataCalonPeserta, {
    localVue,
    store
  });
  it("selector sees participant list", () => {
      const getData = jest.fn()
    function data() {
      return {
        periodId: 1,
        datacalon: [
          {
            id: "fa005e58-b589-4698-9645-2d6f29eb861a",
            "display_name": "Bobby bobby",
            username: "bobbybobby123",
            recording: "/mediafiles/API_Backend_Docs_bhp1uoF.wav"
          }
        ],
        isModal: true,
        isSelector: true,
        studentModalName: "Bobby bobby",
        form: {
          harakatMistake: 1,
          madMistake: 1,
          gunnahMistake: 1,
          isLulus: true,
          levelTahsin: 4,
          catatan: ""
        }
      };
    }
    wrapper = shallowMount(DataCalonPeserta, {
        localVue,
        stubs: ["router-link", "router-view"],
        store,
        data: data,
        methods: {
            getData
        }
    });
    expect(wrapper.find("#table-calon-peserta").text()).toContain(
      "Bobby bobby"
    );
  });

  it("non selector see participant list", () => {
    function data() {
      return {
        periodId: 1,
        datacalon: [
          {
            id: "fa005e58-b589-4698-9645-2d6f29eb861a",
            "display_name": "Bobby bobby",
            username: "bobbybobby123",
            recording: "/mediafiles/API_Backend_Docs_bhp1uoF.wav"
          }
        ],
        isModal: true,
        isSelector: false,
        studentModalName: "Bobby bobby",
        form: {
          harakatMistake: 1,
          madMistake: 1,
          gunnahMistake: 1,
          isLulus: true,
          levelTahsin: 4,
          catatan: ""
        }
      };
    }
    wrapper = shallowMount(DataCalonPeserta, {
      store,
      data: data,
      localVue,
      stubs: ["router-link", "router-view"]
    });
    console.log(wrapper.find("div").text());
    expect(wrapper.find("div").text()).toMatch(
        "Kamu tidak memiliki hak akses ke halaman ini."
      );
  });
});
