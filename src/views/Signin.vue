<template>
  <div>
    <section class="signin-container vector-background">
      <b-container fluid class="signin-child-container">
        <b-row>
          <b-col class="main-cross-center-center">
            <b-img
              :src="require('../assets/img/authentication.png')"
              class="responsive-image"
              alt="authentication"
            />
            <h1 class="title">HALAQAH QURAN ONLINE</h1>
          </b-col>
          <b-col class="main-cross-center-center">
            <h2 class="subtitle" ref="title">Member Login</h2>
            <SignInForm :inputWidth="inputWidth" />
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
import SignInForm from "@/components/SignInForm";
export default {
  components: {
    SignInForm
  },
  name: "SignIn",
  data() {
    return {
      inputWidth: 0
    };
  },
  mounted() {
    this.inputWidth = this.$refs.title.clientWidth;
  }
};
</script>

<style lang="scss" scoped>
.signin-container {
  overflow: hidden;
  position: relative;
  width: 100%;

  @media only screen and (max-width: 1440px) {
    img.responsive-image {
      width: 100% !important;
      max-width: 350px !important;
      height: auto !important;
    }

    h1.title {
      margin-top: 10%;
      font-size: $h2 !important;
      color: black !important;
      font-weight: 600 !important;
    }

    h2.subtitle {
      font-size: $h3 !important;
      color: $black !important;
      font-weight: normal !important;
    }
  }

  .signin-child-container {
    height: 100%;
    position: absolute;
  }

  .row {
    height: 100%;
  }

  img.responsive-image {
    width: 100%;
    max-width: 500px;
    height: auto;
  }

  .col.main-cross-center-center {
    justify-content: center;
    align-items: center;
  }

  .col.main-cross-center-start {
    padding-left: 10%;
    justify-content: center;
    align-items: start;
  }

  h1.title {
    font-size: $h1;
    color: black;
    font-weight: 600;
  }

  h2.subtitle {
    font-size: $h2;
    color: $black;
    font-weight: normal;
  }

  p {
    font-family: "poppins";
    font-weight: 300;
    font-size: 16px;
  }

  a {
    font-weight: 600;
    font-family: "poppins";
    font-size: 16px;
    color: $black;
  }

  a:hover {
    font-weight: 600;
    font-family: "poppins";
    font-size: 16px;
    color: $primary;
    text-decoration: none;
  }
}
</style>