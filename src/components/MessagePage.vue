<template>
  <div class="message-container col center">
    <img class="hero-message" :src="img" alt="Message" />
    <h3 class="header-title" :class="[isDanger ? 'red' : '']">{{ title }}</h3>
    <p class="message">{{ msg }}</p>
    <p class="message">{{ msg2 }}</p>
    <div class="flex">
      <router-link v-for="(data, index) in goto" :key="index" :to="data.link">
        <button class="btn" :class="[isPrimary ? 'primary' : '']">{{ data.str }}</button>
      </router-link>
    </div>
    <img src="@/assets/img/vector-4.png" alt="vector" class="svg-4" />
    <img src="@/assets/img/vector-5.png" alt="vector" class="svg-5" />
    <img src="@/assets/img/vector-6.png" alt="vector" class="svg-6" />
    <img src="@/assets/img/vector-7.png" alt="vector" class="svg-7" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MessagePage",
  props: {
    isDanger: Boolean,
    isPrimary: Boolean,
    img: String,
    title: String,
    msg: String,
    msg2: String,
    goto: Array
  }
};
</script>

<style lang="scss">
@media only screen and (min-width: 768px) {
  h1.header-title {
    font-size: $h1 !important;
  }

  h2.header-title {
    font-size: $h2 !important;
  }

  h3.header-title {
    font-size: $h3 !important;
  }

  .hero-message {
    max-width: 50%;
  }

  .message {
    max-width: 100% !important;
    font-size: 16px !important;
  }
}

.hero-message {
  max-width: 75%;
  margin-bottom: $gap-m-2;
}

.message {
  margin-top: $gap-sm-1;
  text-align: center;
  max-width: 80%;
  font-size: 12px;
}

.message-container {
  min-width: 20%;
  max-height: 40%;
  margin-bottom: $gap-m-2;
}

.header-title {
  margin-bottom: $gap-m-1;
  text-align: center;
  font-size: 16px;
}

.red {
  color: #eb4d55;
}

.gray {
  color: #e5e5e5;
}

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
