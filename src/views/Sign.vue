<template>
  <div>
    <section class="primary-container">
      <b-container fluid class="secondary-container">
        <b-row>
          <b-col class="main-cross-center-center">
            <b-img
              :src="require('../assets/img/authentication.png')"
              class="responsive-image"
              alt="authentication"
            />
            <h1 class="title">HALAQAH QURAN ONLINE</h1>
          </b-col>
          <b-col v-if="signinFlag" class="main-cross-center-center" ref="form_container">
            <h2 class="subtitle" ref="title">Member Login</h2>
            <SignInForm :inputWidth="inputWidth"/>
          </b-col>
          <b-col v-else class="main-cross-center-center" ref="form_container">
            <h2 class="subtitle" ref="title">Create Your Account</h2>
            <SignUpForm :inputWidth="inputWidth" />
          </b-col>
        </b-row>
      </b-container>
      <Background />
    </section>
  </div>
</template>

<script>
import SignInForm from "@/components/SignInForm"
import SignUpForm from "@/components/SignUpForm"
import Background from "@/components/Backgrounds/first_background"
import Vue from "vue";
require("@/styles/reusable/sign.css");
export default {
  components: {
    SignInForm,
    SignUpForm,
    Background
  },
  name: "Sign",
  data() {
    return {
      signinFlag: null,
      inputWidth: 0
    };
  },
  watch: {
    $route(to, from) {
      if (this.$route.path == "/sign/in") {
        this.signinFlag = true
      } else {
        this.signinFlag = false
      }
    }
  },
  mounted() {
    this.inputWidth = this.$refs.form_container.clientWidth;
  },
  created() {
    if (this.$route.params.indicator == "in") {
      this.signinFlag = true;
    } else if (this.$route.params.indicator == "up") {
      this.signinFlag = false;
    }
  }
};
</script>

<style scoped src="@/styles/reusable/sign.css">
</style>