<template>
  <div id="app">
    <NavLoggedIn v-if="isUserLoggedIn" />
    <NavBeforeLogin v-else />
    <div class="layout">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBeforeLogin from "@/components/NavBeforeLogin";
import NavLoggedIn from "@/components/NavLoggedIn";
import { mapGetters } from "vuex"

export default {
  name: "app",
  components: {
    NavBeforeLogin,
    NavLoggedIn
  },
  computed: {
    ...mapGetters(["isUserLoggedIn"])
  }
};
</script>

<style>
.layout {
  padding-top: 10vh;
}
</style>