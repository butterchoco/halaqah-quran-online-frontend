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
      title: "Access Restricted",
      msg: "You are not supposed to be here !",
      goto: [
        {
          str: "Back to home",
          link: "/"
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