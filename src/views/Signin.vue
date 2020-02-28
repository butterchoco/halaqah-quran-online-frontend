<template>
  <div>
    <section class="signup-container">
      <b-container fluid>
        <b-row class="row-container">
          <b-col class="column-container">
            <div class="image-container">
              <b-img :src="require('../assets/img/authentication.png')" alt="authentication" />
            </div>
            <h1 class="header-login">HALAQAH QURAN ONLINE</h1>
          </b-col>
          <b-col class="column-container-two">
            <h2 class="header-login">Member Login</h2>
            <div class="w-75">
              <b-form @reset="onReset" v-if="show">
                <b-form-group id="input-group-1" label="Username" label-for="input-1">
                  <b-form-input id="input-1" class="custom-input" v-model="form.username" required></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-5" label="Password" label-for="input-5">
                  <b-form-input
                    id="input-5"
                    v-model="form.password"
                    type="password"
                    class="custom-input"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-button type="reset" variant="none" class="primary custom-button">Login</b-button>
              </b-form>
            </div>
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
export default {
  name: "Signup",
  data() {
    return {
      show: true,
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    onReset(evt) {
      evt.preventDefault();
      this.form.username = "";
      this.form.password = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style lang="scss">
.signup-container {
  overflow: hidden;

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

  .custom-input {
    background-color: #f3f3f3;
    border-radius: 20px;
    border: none !important;
    border-color: transparent !important;
  }

  .custom-button {
    border-radius: 20px;
  }

  .row-container {
    height: 100vh;
  }

  .image-container {
    width: 500px;
    height: 345px;
  }

  .column-container {
    justify-content: center;
    align-items: center;
  }

  .column-container-two {
    justify-content: center;
    align-items: start;
  }

  .image-container img {
    max-height: 100%;
    max-width: 100%;
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