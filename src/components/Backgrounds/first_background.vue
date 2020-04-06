<template>
  <div>
    <img src="@/assets/img/vector-1.png" alt="vector" class="svg-1" />
    <img src="@/assets/img/vector-2.png" alt="vector" class="svg-2" />
    <img src="@/assets/img/vector-3.png" alt="vector" class="svg-3" />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
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
</style>