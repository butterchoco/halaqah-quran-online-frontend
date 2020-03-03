<template>
  <b-form @submit.stop.prevent="onSubmit" :style="inputStyle">
    <b-form-group id="input-group-1" label="Username" label-for="input-1">
      <b-form-input
        id="input-1"
        class="custom-input"
        v-model="form.username"
        :state="validateState('username')"
        aria-describedby="input-1-live-feedback"
      ></b-form-input>
      <b-form-invalid-feedback
        id="input-1-live-feedback"
        class="error_username"
      >This field is required</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group id="input-group-5" label="Password" label-for="input-5">
      <b-form-input
        id="input-5"
        v-model="form.password"
        type="password"
        class="custom-input"
        :state="validateState('password')"
        aria-describedby="input-2-live-feedback"
      ></b-form-input>
      <b-form-invalid-feedback
        id="input-2-live-feedback"
        class="error_password"
      >This field is required</b-form-invalid-feedback>
    </b-form-group>
    <div class="btn-container">
      <b-button disabled v-if="isLoading" class="primary">
        <span class="spinner-grow spinner-grow-sm"></span>
        Login..
      </b-button>
      <b-button v-else type="submit" variant="none" ref="btn-submit" class="primary">Login</b-button>
      <p>
        OR
        <a href="#">Create New Account</a>
      </p>
    </div>
  </b-form>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import UserInfo from "@/store/modules/UserInfo";
import { required } from "vuelidate/lib/validators";
import Vue from "vue";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
export default {
  props: {
    inputWidth: Number
  },
  name: "SignInForm",
  data() {
    return {
      isLoading: false,
      show: true,
      form: {
        username: "",
        password: ""
      }
    };
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    ...mapMutations(["setUserIdentification", "setUserToken"]),
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    postForm() {
      this.$axios
        .post(process.env.VUE_APP_URL + "/api/auth/jwt/create/", {
          "username": this.form.username,
          "password": this.form.password
        })
        .then(response => {
          this.$store.commit("setUserIdentification", {
            value: this.form.username
          });
          this.$store.commit("setUserToken", { value: this.form.password });
        })
        .catch(error => {
          // do nothing
        })
        .finally(() => (this.isLoading = false));
    },
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      } else {
        this.isLoading = true;
        this.postForm();
      }
    }
  },
  computed: {
    ...mapGetters(["getUserIdentification", "getUserToken"]),
    inputStyle() {
      return "width: " + this.inputWidth * 2 + "px";
    }
  }
};
</script>

<style lang="scss" scoped>
input {
  background-color: #f3f3f3;
  border-radius: 20px;
  border: none !important;
  border-color: transparent !important;
}
button {
  margin-top: 0px !important;
  border-radius: 20px;
}
form {
  margin-top: 3%;
}
p {
  padding-left: 2%;
  font-family: "poppins";
  font-weight: 300;
  font-size: 16px;
  display: inline-block;
  margin: 0;
}

a {
  font-weight: 600;
  font-family: "poppins";
  font-size: 16px;
  color: $black;
}
.btn-container {
  padding-top: 2%;
}
</style>