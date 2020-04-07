<template>
  <section class="primary-container vector-background">
    <b-container class="secondary-container py-5">
      <b-row align-v="center" class="third-container">
        <b-col class="hero-container" sm="12" md="6" align-h="center">
          <b-img
            :src="require('../assets/img/authentication.png')"
            class="responsive-image"
            alt="authentication"
          />
          <h1 class="title">HALAQAH QURAN ONLINE</h1>
        </b-col>
        <b-col v-if="signinFlag" sm="12" md="6" align-h="center" ref="form_container">
          <h2 class="subtitle" ref="title">Member Login</h2>
          <SignInForm :inputWidth="inputWidth" />
        </b-col>
        <b-col v-else sm="12" md="6" align-h="center" ref="form_container">
          <h2 class="subtitle" ref="title">Create Your Account</h2>
          <SignUpForm :inputWidth="inputWidth" />
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";

export default {
  components: {
    SignInForm,
    SignUpForm
  },
  name: "Sign",
  data() {
    return {
      signinFlag: null,
      inputWidth: 0
    };
  },
  watch: {
    $route() {
      if (this.$route.path == "/sign/in") {
        this.signinFlag = true;
      } else {
        this.signinFlag = false;
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

<style lang="scss" scoped>
@import "@/styles/reusable/sign.scss";
.primary-container {
  min-height: inherit;
}

.secondary-container {
  min-height: inherit;
}

.third-container {
  min-height: inherit;
  width: inherit;
  margin: 0;
}

.hero-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>