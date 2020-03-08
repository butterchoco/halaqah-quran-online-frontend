<template>
  <div class="message-container col center vector-background">
    <img class="hero-message" :src="img" alt="Message" />
    <h3 class="header-title" :class="[isDanger ? 'red' : '']">{{ title }}</h3>
    <p class="message">{{ msg }}</p>
    <p class="message">{{ msg2 }}</p>
    <div class="flex">
      <router-link v-for="(data, index) in goto" :key="index" :to="data.link">
        <button
          v-for="(data, index) in goto"
          :key="index"
          @click="toggleModal()"
          class="btn"
          :class="[isPrimary ? 'primary' : '']"
        >{{ data.str }}</button>
      </router-link>
    </div>
    <Modal v-if="isModal" @exit="toggleModal" :isDanger="isDanger" :dataModal="dataModal" />
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
export default {
  name: "MessagePage",
  components: { Modal },
  props: {
    isDanger: Boolean,
    isPrimary: Boolean,
    img: String,
    title: String,
    msg: String,
    msg2: String,
    dataModal: Object,
    goto: Array
  },
  data() {
    return {
      isModal: false
    };
  },
  methods: {
    toggleModal() {
      this.isModal = !this.isModal;
    }
  }
};
</script>

<style lang="scss" scoped>
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
    margin-bottom: 5%;
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
</style>