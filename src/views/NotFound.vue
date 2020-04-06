<template>
  <section class="vector-background col center">
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
      img: require("@/assets/img/404-not-found.png"),
      title: "404 Not Found",
      msg: "Where are you going ? Nobody here.",
      goto: [
        {
          link: "/",
          str: "Back to home"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>