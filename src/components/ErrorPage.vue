<template>
  <div class="error-container col center">
    <img class="hero-message" :src="img" alt="Error Message" />
    <h3 class="header-title">{{ title }}</h3>
    <h4 class="message">{{ msg }}</h4>
    <router-link v-if="goto" :to="goto.link">
      <button class="btn primary">{{ goto.str }}</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ErrorPage",
  props: {
    img: String,
    title: String,
    msg: String,
    goto: Object
  }
};
</script>

<style lang="scss">
.hero-message {
  max-width: 20rem;
}

.error-container {
  min-width: 20%;
  max-height: 40%;
}

.header-title {
  text-align: center;
  color: $primary;
}
</style>