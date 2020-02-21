import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import App from "@/App.vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Program from "@/views/Program.vue";
import routes from "@/router/index.ts";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("App", () => {
  it("renders Home component via routing", async () => {
    const router = routes;
    const wrapper = mount(App, {
      localVue,
      router
    });
    expect(wrapper.find(Home).exists()).toBe(true);
  });

  it("render About component via routing", async () => {
    const router = routes;
    const wrapper = mount(App, {
      localVue,
      router

    router.push("/about");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(About).exists()).toBe(true);
  });

  it("render Program component via routing", async () => {
    const router = routes;
    const wrapper = mount(App, {
      localVue,
      router
    });

    router.push("/program");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(Program).exists()).toBe(true);
  });
});
