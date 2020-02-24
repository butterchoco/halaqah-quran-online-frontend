<template>
  <div id="app">
    <NavBeforeLogin />
    <div class="layout">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBeforeLogin from "@/components/NavBeforeLogin";

export default {
  name: "app",
  components: {
    NavBeforeLogin
  }
};
</script>

<style>
.layout {
  padding-top: 10vh;
}
</style>