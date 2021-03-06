import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@/styles/_global.scss";
import "@/styles/_variables.scss";
import Axios from "axios";
import Vuelidate from "vuelidate";
import VueAudio from "vue-audio"

Vue.prototype.$axios = Axios;
Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.component("vue-audio", VueAudio)

Vue.prototype.$http = Axios;
const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");