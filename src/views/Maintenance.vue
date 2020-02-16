<template>
  <div>
    <section class="maintenance-container col center">
      <ErrorMaintenance :img="img" :title="title" :msg="msg" />
      <img src="@/assets/img/vector-1.png" class="svg-1" />
      <img src="@/assets/img/vector-2.png" class="svg-2" />
      <img src="@/assets/img/vector-3.png" class="svg-3" />
    </section>
  </div>
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

<style lang="scss">
.maintenance-container {
  overflow: hidden;

  .svg-1 {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
    max-width: 40%;
    max-height: 20%;
  }

  .svg-2 {
    position: absolute;
    z-index: -2;
    bottom: 0;
    left: 0;
    max-width: 40%;
    max-height: 25%;
  }

  .svg-3 {
    position: absolute;
    z-index: -2;
    top: 0;
    right: 0;
    max-width: 20%;
    max-height: 20%;
  }
}
</style>