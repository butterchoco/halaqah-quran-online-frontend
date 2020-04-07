<template>
  <div id="app">
    <NavLoggedIn v-if="isUserLoggedIn" />
    <NavBeforeLogin v-else />
    <div :class="[ isUserLoggedIn ? 'mobile' : 'layout']">
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

<style  scoped>
@media only screen and (min-width: 768px) {
  .layout,
  .mobile {
    min-height: 90vh !important;
    margin-top: 10vh !important;
    margin-bottom: 0 !important;
  }
}

.layout {
  min-height: 84vh;
  margin: 8vh 0;
}

.mobile {
  min-height: 92vh;
  margin-bottom: 8vh;
  margin-top: 0;
}
</style>