<template>
<div>
  <img src="@/assets/img/vector-4.png" alt="vector" class="svg-4" />
  <img src="@/assets/img/vector-5.png" alt="vector" class="svg-5" />
  <img src="@/assets/img/vector-6.png" alt="vector" class="svg-6" />
  <img src="@/assets/img/vector-7.png" alt="vector" class="svg-7" />
</div>
</template>

<script>
export default {};
</script>

<style scoped>
.svg-4 {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
  max-width: 40%;
  max-height: 20%;
}

.svg-5 {
  position: absolute;
  z-index: -2;
  bottom: 0;
  left: 0;
  max-width: 40%;
  max-height: 25%;
}

.svg-6 {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: -1;
  max-width: 40%;
  max-height: 50%;
}

.svg-7 {
  position: absolute;
  z-index: -2;
  bottom: 0;
  right: 0;
  max-width: 30%;
  max-height: 50%;
}
</style>