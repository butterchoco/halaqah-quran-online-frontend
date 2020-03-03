<template>
  <div>
    <section class="signup-container">
      <b-container fluid class="signup-child-container">
        <b-row>
          <b-col class="main-cross-center-center">
            <b-img
              :src="require('../assets/img/authentication.png')"
              class="responsive-image"
              alt="authentication"
            />
            <h1 class="title">HALAQAH QURAN ONLINE</h1>
          </b-col>
          <b-col class="main-cross-center-start">
            <h2 class="subtitle" ref="title">Create Your Account</h2>
            <SignUpForm :inputWidth="inputWidth" />
            <p style="margin-top: 2%;">
              Already have account?
              <a href>login Here</a>
            </p>
          </b-col>
        </b-row>
      </b-container>
      <img src="@/assets/img/vector-1.png" alt="vector" class="svg-1" />
      <img src="@/assets/img/vector-2.png" alt="vector" class="svg-2" />
      <img src="@/assets/img/vector-3.png" alt="vector" class="svg-3" />
    </section>
  </div>
</template>

<script>
import SignUpForm from "@/components/SignUpForm";
export default {
  components: {
    SignUpForm
  },
  name: "SignUp",
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

<style lang="scss">
.signup-container {
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

  .signup-child-container {
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

  .svg-1 {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
    max-width: 40%;
    max-height: 20%;
  }

  .svg-2 {
    position: absolute;
    z-index: -2;
    bottom: 0;
    left: 0;
    max-width: 40%;
    max-height: 25%;
  }

  .svg-3 {
    position: absolute;
    z-index: -2;
    top: 0;
    right: 0;
    max-width: 20%;
    max-height: 20%;
  }
}
</style>