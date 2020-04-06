<template>
  <section class="maintenance-container vector-background col center">
    <ErrorMaintenance :img="img" :title="title" :msg="msg" :goto="goto" />
  </section>
</template>

<script>
import ErrorMaintenance from "@/components/ErrorPage";
export default {
  name: "Maintenance",
  components: {
    ErrorMaintenance
  },
  data() {
    return {
      img: require("@/assets/img/failed-selection.png"),
      title: "You are not logged in !",
      msg: "Login first to access this page",
      goto: [
        {
          str: "Login to my account",
          link: "/sign/in"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.maintenance-container {
  height: inherit;
}
</style>