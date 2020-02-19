import { shallowMount } from "@vue/test-utils";
import Maintenance from "@/views/Maintenance.vue";

describe("Maintenance.vue", () => {
	it("renders data when passed", () => {
		function data() {
			return {
				msg: "Anything",
				title: "title goes here",
				img: require("@/assets/img/404-not-found.png"),
				goto: {
					link: "/",
					str: "Back to home"
				}
			};
		}
		const wrapper = shallowMount(Maintenance, {
			data
		});
		expect(wrapper.vm.$data).toMatchObject(data());
	});
});
