<template>
  <section class="maintenance-container vector-background col center">
    <ErrorMaintenance :img="img" :title="title" :msg="msg" />
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
      img: require("@/assets/img/maintenance.png"),
      title: "Sorry, this page is under maintenance !",
      msg: "Please come back later until it's up."
    };
  }
};
</script>

<style lang="scss" scoped>
.maintenance-container {
  height: inherit;
}
</style>