<template>
  <div class="error-container">
    <img class="hero-message" :src="img" alt="Error Message" />
    <h3 class="header-title" :class="{ 'isPrimary': isPrimary, 'isDanger': isDanger }">{{ title }}</h3>
    <p class="message">{{ msg }}</p>
    <p class="message2 mb-4">{{ msg2 }}</p>
    <router-link v-for="(data, index) in goto" :key="index" :to="data.link">
      <button class="redirect btn" :class="{'primary': isPrimary, }">{{ data.str }}</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ErrorPage",
  props: {
    img: String,
    title: String,
    isPrimary: Boolean,
    isDanger: Boolean,
    msg: String,
    msg2: String,
    goto: Array
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
  text-align: center;
}

img.hero-message {
  max-width: 50%;
  max-height: 40%;
}

.header-title {
  margin-top: $gap-m-2;
  font-weight: bold;
}

.isDanger {
  color: $danger;
}

.isPrimary {
  color: $primary;
}

.message {
  margin-top: $gap-sm-3;
}

.redirect {
  margin-top: $gap-m-2;
}
</style>