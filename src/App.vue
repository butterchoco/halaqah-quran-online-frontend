<template>
  <div id="app">
    <NavLoggedIn v-if="isUserLoggedIn" />
    <NavBeforeLogin v-else />
    <div :class="[ isUserLoggedIn ? 'loggedIn' : 'notLoggedIn']">
      <router-view />
    </div>
    <ErrorToast />
  </div>
</template>

<script>
import NavBeforeLogin from "@/components/NavBeforeLogin";
import NavLoggedIn from "@/components/NavLoggedIn";
import { mapGetters } from "vuex";
import ErrorToast from "@/components/ErrorToast";

export default {
  name: "app",
  components: {
    NavBeforeLogin,
    NavLoggedIn,
    ErrorToast
  },
  computed: {
    ...mapGetters(["isUserLoggedIn"])
  }
};
</script>

<style>
@media only screen and (min-width: 768px) {
  .notLoggedIn,
  .loggedIn {
    min-height: 878px !important;
    margin-top: 10vh !important;
    margin-bottom: 0 !important;
  }
}

.notLoggedIn {
  min-height: 84vh;
  margin: 8vh 0;
}

.loggedIn {
  min-height: 92vh;
  margin-bottom: 8vh;
  margin-top: 0;
}
</style>