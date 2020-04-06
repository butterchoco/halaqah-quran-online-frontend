<template>
  <div class="activation-container col center">
    <section class="main-container col center">
      <b-img :src="img" alt="Message" fluid />
      <h3 id="first_balancer">{{ title }}</h3>
      <b-button
        variant="none"
        class="primary"
      >{{ msgButton }}</b-button>
    </section>
    <Background />
  </div>
</template>

<script>
import MessagePage from "@/components/MessagePage.vue";
import Background from "@/components/Backgrounds/second_background";
import axios from "axios";
export default {
  name: "ActivationPage",
  components: { Background },
  data() {
    return {
      img: "",
      title: "",
      msg: "",
      msgButton: ""
    };
  },
  methods: {
    isActivated() {
      this.img = require("../assets/img/success-selection-1.png");
      this.title = "Your account has been activated";
      this.msg = "Please login to continue using the application";
      this.msgButton = "Go to login page"
    },
    isExpired() {
      this.img = require("../assets/img/failed-selection-2.png");
      this.title = "Activation link has expired";
      this.msg = "Please resend the email verification";
      this.msgButton = "Resend Verification"
    }
  },
  created() {
    axios
      .post(process.env.VUE_APP_URL + "/api/auth/users/activation/", {
        uid: this.$route.params.uid,
        token: this.$route.params.token
      })
      .then(() => {
        this.isActivated();
      })
      .catch(() => {
        this.isExpired();
      });
  }
};
</script>

<style lang="scss">
.activation-container {
  min-width: 20%;
  max-height: 40%;

  .main-container {
    overflow: hidden;
  }

  #first_balancer {
    margin-top: 1%;
    margin-bottom: 1%;
  }

  #second_balancer {
    margin-top: 2% !important;
  }
}
</style>
