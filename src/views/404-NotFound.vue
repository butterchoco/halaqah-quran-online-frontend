<template>
  <div>
    <section class="maintenance-container col center">
      <ErrorMaintenance :img="img" :title="title" :msg="msg" :goto="goto" />
      <img src="@/assets/img/vector-1.png" alt="vector" class="svg-1" />
      <img src="@/assets/img/vector-2.png" alt="vector" class="svg-2" />
      <img src="@/assets/img/vector-3.png" alt="vector" class="svg-3" />
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
      img: require("@/assets/img/404-not-found.png"),
      title: "404 Not Found",
      msg: "Where are you going ? Nobody here.",
      goto: {
        link: "/",
        str: "Back to home"
      }
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