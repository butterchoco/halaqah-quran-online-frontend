<template>
  <div>
    <b-form @submit.stop.prevent="onSubmit" :style="inputStyle" autocomplete="off">
      <b-row>
        <b-col>
          <b-form-group id="input-group-1" label="Username" label-for="input-1">
            <b-form-input
              id="input-1"
              size="sm"
              v-model="form.username"
              :state="validateState('username')"
              aria-describedby="input-1-live-feedback"
            ></b-form-input>
            <b-form-invalid-feedback
              id="input-1-live-feedback"
              class="error_username"
            >You can use letters, numbers, and _</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="input-group-2" label="Full Name" label-for="input-2">
            <b-form-input
              id="input-2"
              size="sm"
              v-model="form.fullname"
              :state="validateState('fullname')"
              aria-describedby="input-2-live-feedback"
            ></b-form-input>
            <b-form-invalid-feedback
              id="input-2-live-feedback"
              class="error_fullname"
            >Requires first and last name</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="input-group-3" label="No. Whatsapp" label-for="input-3">
            <b-form-input
              id="input-3"
              size="sm"
              v-model="form.number"
              :state="validateState('number')"
              aria-describedby="input-3-live-feedback"
              type="number"
            ></b-form-input>
            <b-form-invalid-feedback
              id="input-3-live-feedback"
              class="error_number"
            >Please enter a valid number</b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group id="input-group-4" label="Email" label-for="input-4">
            <b-form-input
              id="input-4"
              size="sm"
              v-model="form.email"
              :state="validateState('email')"
              aria-describedby="input-4-live-feedback"
            ></b-form-input>
            <b-form-invalid-feedback
              id="input-4-live-feedback"
              class="error_email"
            >Please enter a valid email address</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="input-group-5" label="Password" label-for="input-5">
            <b-form-input
              id="input-5"
              size="sm"
              v-model="form.password"
              :state="validateState('password')"
              aria-describedby="input-5-live-feedback"
              type="password"
            ></b-form-input>
            <b-form-invalid-feedback
              id="input-5-live-feedback"
              class="error_password"
            >Please enter a valid password</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="input-group-6" label="Repeat Password" label-for="input-6">
            <b-form-input
              id="input-6"
              size="sm"
              v-model="form.passwordValidation"
              :state="validateState('passwordValidation')"
              aria-describedby="input--live-feedback"
              type="password"
            ></b-form-input>
            <b-form-invalid-feedback
              id="input-6-live-feedback"
              class="error_password_validation"
            >Confirm password must match</b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <div class="btn-container">
        <b-button type="submit" size="sm" ref="btn-submit" variant="none" class="primary">Register</b-button>
        <p style="margin-top: 2%;">
          Already have account?
          <router-link to="/sign/in">login Here</router-link>
        </p>
      </div>
    </b-form>
    <div v-if="isLoading" id="cover-spin"></div>
    <b-modal id="registration-modal" size="sm" hide-header-close centered>
      <div class="modal-img-container">
        <b-img :src="modal.image" class="modal-image" alt="modal-image" fluid />
      </div>
      <div class="modal-align-center">
        <h3>{{ modal.title }}</h3>
        <p>
          {{ modal.message }}
          <br />
          <b>{{ modal.trailingMessage }}</b>
        </p>
      </div>
      <template v-slot:modal-footer="{ ok }">
        <b-button
          v-if="modal.isSuccess"
          type="button"
          @click="toSignin"
          size="sm"
          variant="none"
          class="primary"
          id="modal-button"
        >{{ modal.button }}</b-button>
        <b-button
          v-else
          type="button"
          @click="ok"
          size="sm"
          variant="none"
          class="primary"
          id="modal-button"
        >{{ modal.button }}</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios"
require("@/styles/reusable/form.css");
require("@/styles/reusable/loading.css");
require("@/styles/reusable/modal.css");
import {
  required,
  minLength,
  email,
  maxLength,
  sameAs,
  numeric
} from "vuelidate/lib/validators";
import {
  hasLowerCase,
  hasUpperCase,
  hasNumber,
  fullNameValid
} from "../validator";

export default {
  name: "SignUpForm",
  props: {
    inputWidth: Number
  },
  data() {
    return {
      show: true,
      isLoggedin: false,
      isLoading: false,
      form: {
        username: "",
        fullname: "",
        number: null,
        email: "",
        password: "",
        passwordValidation: ""
      },
      modal: {
        title: "",
        image: "",
        message: "",
        trailingMessage: "",
        button: "",
        isSuccess: false
      }
    };
  },
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(150)
      },
      fullname: {
        required,
        fullNameValid
      },
      number: {
        required,
        numeric,
        minLength: minLength(10),
        maxLength: maxLength(20)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8),
        hasLowerCase,
        hasUpperCase,
        hasNumber
      },
      passwordValidation: {
        required,
        sameAsPassword: sameAs("password")
      }
    }
  },
  methods: {
    registrationSuccess(value) {
      this.modal.title = "Registration Success";
      this.modal.image = require("../assets/img/success-email.png");
      this.modal.message = value + " telah bergabung di hafidzisme";
      this.modal.trailingMessage = "Silahkan cek email untuk aktivasi akun!";
      this.modal.button = "Go to login page";
      this.modal.isSuccess = true;
      this.$bvModal.show("registration-modal");
    },
    registrationFailure(value, secondValue) {
      this.modal.title = "Registration Failure";
      this.modal.image = require("../assets/img/success-selection.png");
      this.modal.message = value;
      this.modal.trailingMessage = secondValue;
      this.modal.button = "Try Again";
      this.modal.isSuccess = false;
      this.$bvModal.show("registration-modal");
    },
    hideModal() {
      this.$bvModal.hide("registration-modal");
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      } else {
        this.isLoading = true;
        this.postForm();
      }
    },
    postForm() {
      const nameArr = this.form.fullname.split(" ")
      const firstName = nameArr.splice(0,1)
      let lastName = ""
      function concateLastname(value, index, array) {
        if (index != nameArr.length - 1) {
          lastName += value + " " 
        }
        else {
          lastName += value
        }
      }
      nameArr.forEach(concateLastname)
      axios
        .post(process.env.VUE_APP_URL + "/api/auth/users/", {
          "username": this.form.username,
          "email": this.form.email,
          "password": this.form.password,
          "re_password": this.form.passwordValidation,
          "first_name": firstName,
          "last_name": lastName,
          "whatsapp_number": this.form.number
        })
        .then(() => {
          this.isLoggedin = true;
          this.registrationSuccess(this.form.username);
        })
        .catch(error => {
          if (error.response.data.username) {
            this.registrationFailure(
              "Please try again!",
              error.response.data.username[0]
            );
          } else {
            this.registrationFailure(
              "Please try again latter",
              "Website temporarily unavailable"
            );
          }
        })
        .finally(() => (this.isLoading = false));
    },
    toSignin() {
      this.$router.push("/sign/in");
    }
  },
  computed: {
    inputStyle() {
      const halfWidth = this.inputWidth * 0.7;
      return "width: " + halfWidth + "px";
    }
  }
};
</script>

<style scoped src="@/styles/reusable/form.css"></style>
<style scoped src="@/styles/reusable/loading.css"></style>
<style scoped src="@/styles/reusable/modal.css"></style>