import { shallowMount } from "@vue/test-utils";
import Store from "@/store/index.ts";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Program from "@/views/Program.vue";
import routes from "@/router/index.ts";

describe("App", () => {
  it("renders Home component via routing", async () => {
    const router = routes;
    const store = Store;
    const wrapper = shallowMount(Home, {
      router,
      store
    });
    expect(wrapper.vm.$route.path).toBe("/");
  }, 1000);

  it("render About component via routing", async () => {
    const router = routes;
    const store = Store;
    const wrapper = shallowMount(About, {
      router,
      store
    });
    router.push("/about").catch(() => {
      expect(wrapper.vm.$route.path).not.toBe("/about");
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.path).toBe("/about");
  }, 1000);

  it("render Program component via routing", async () => {
    const router = routes;
    const store = Store;
    const wrapper = shallowMount(Program, {
      router,
      store
    });

    router.push("/program").catch(() => {
      expect(wrapper.vm.$route.path).not.toBe("program");
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.path).toBe("/program");
  }, 1000);
});
