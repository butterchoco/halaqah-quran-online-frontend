<template>
  <section class="primary-container vector-background">
    <b-container class="secondary-container">
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
          <SignInForm />
        </b-col>
        <b-col v-else sm="12" md="6" align-h="center" ref="form_container">
          <h2 class="subtitle" ref="title">Create Your Account</h2>
          <SignUpForm />
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";
import router from "@/router";

export default {
  components: {
    SignInForm,
    SignUpForm
  },
  name: "Sign",
  data() {
    return {
      signinFlag: null
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
  created() {
    if (this.getUserRole[this.getUserRole.length - 1].role_id != 0) {
      router.push("/");
    }
    if (this.$route.path == "/sign/in") {
      this.signinFlag = true;
    } else {
      this.signinFlag = false;
    }
  },
  computed: {
    ...mapGetters({
      getUserRole: "getUserRole"
    })
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
  padding: 0 2rem;
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

@media only screen and (max-width: 768px) {
  .hero-container {
    display: none;
  }
}
</style>