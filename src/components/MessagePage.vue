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

  .vector {
    max-height: 120% !important;
    max-width: 120% !important;
    min-height: 100%;
    min-width: 100%;

    &.svg-4 {
      top: 180% !important;
      left: 0 !important;
      margin-left: -45rem !important;
    }

    &.svg-5 {
      top: 310% !important;
      right: 0 !important;
      margin-right: -45rem !important;
    }

    &.svg-6 {
      top: 310% !important;
      right: 0 !important;
      margin-right: -40rem !important;
    }

    &.svg-7 {
      top: 530% !important;
      left: 0 !important;
      margin-left: -60rem !important;
    }
  }
}

.hero-message {
  max-width: 75%;
}

.message-container {
  min-width: 20%;
  max-height: 40%;
}

.header-title {
  text-align: center;
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

.svg-6 {
  position: absolute;
  bottom: 0;
  right: 0;
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

.svg-7 {
  position: absolute;
  z-index: -2;
  bottom: 0;
  right: 0;
  max-width: 20%;
  max-height: 20%;
}
</style>
