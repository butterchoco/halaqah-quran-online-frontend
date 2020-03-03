<template>
  <div>
    <section class="main-container col center">
      <p>Test authentication page</p>
      <img src="@/assets/img/vector-1.png" alt="vector" class="svg-1" />
      <img src="@/assets/img/vector-2.png" alt="vector" class="svg-2" />
      <img src="@/assets/img/vector-3.png" alt="vector" class="svg-3" />
    </section>
  </div>
</template>

<script>
export default {
  name: "TestAuthentication",
  data() {
    return {
      
    };
  }
};
</script>

<style lang="scss" scoped>
.main-container {
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