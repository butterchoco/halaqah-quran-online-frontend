<template>
  <div class="error-container">
    <img class="hero-message" :src="img" alt="Error Message" />
    <h3 class="header-title">{{ title }}</h3>
    <p class="message">{{ msg }}</p>
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

<style lang="scss" scoped>
div.error-container {
  overflow: hidden;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: inherit;
}

img.hero-message {
  max-width: 40%;
  max-height: 40%;
}

h2 {
  margin-bottom: $gap-sm-2;
}

.message {
  margin-bottom: $gap-m-2;
}
</style>