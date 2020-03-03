<template>
  <div>
    <b-form @submit.stop.prevent="onSubmit" :style="inputStyle">
      <b-row>
        <b-col>
          <b-form-group id="input-group-1" label="Username" label-for="input-1">
            <b-form-input id="input-1" size="sm" v-model="form.username" :state="validateState('username')" aria-describedby="input-1-live-feedback" @keyup="touchForm('username')"></b-form-input>
            <b-form-invalid-feedback id="input-1-live-feedback" class="error_username">Please enter a valid username</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="input-group-2" label="Full Name" label-for="input-2">
            <b-form-input id="input-2" size="sm" v-model="form.fullname" :state="validateState('fullname')" aria-describedby="input-2-live-feedback" @keyup="touchForm('fullname')"></b-form-input>
            <b-form-invalid-feedback id="input-2-live-feedback" class="error_fullname">Please enter a valid name</b-form-invalid-feedback>
          </b-form-group>
           <b-form-group id="input-group-3" label="No. Whatsapp" label-for="input-3">
            <b-form-input id="input-3" size="sm" v-model="form.number" :state="validateState('number')" aria-describedby="input-3-live-feedback" type="number" @keyup="touchForm('number')"></b-form-input>
            <b-form-invalid-feedback id="input-3-live-feedback" class="error_number">Please enter a valid number</b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group id="input-group-4" label="Email" label-for="input-4">
            <b-form-input id="input-4" size="sm" v-model="form.email" :state="validateState('email')" aria-describedby="input-4-live-feedback" @keyup="touchForm('email')"></b-form-input>
            <b-form-invalid-feedback id="input-4-live-feedback" class="error_email">Please enter a valid email address</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="input-group-5" label="Password" label-for="input-5">
            <b-form-input id="input-5" size="sm" v-model="form.password" :state="validateState('password')" aria-describedby="input-5-live-feedback" type="password" @keyup="touchForm('password')"></b-form-input>
            <b-form-invalid-feedback id="input-5-live-feedback" class="error_password">Please enter a valid password</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="input-group-6" label="Repeat Password" label-for="input-6">
            <b-form-input id="input-6" size="sm" v-model="form.passwordValidation" :state="validateState('passwordValidation')" aria-describedby="input--live-feedback" type="password" @keyup="touchForm('passwordValidation')"></b-form-input>
            <b-form-invalid-feedback id="input-6-live-feedback" class="error_password_validation">Confirm password must match</b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-button type="submit" size="sm" ref="btn-submit" variant="none" class="primary">
        Register
      </b-button>
    </b-form>
    <b-modal id="registration-modal" size="sm" centered hide-footer>
      <b-img :src="modal.image" class="responsive-image" alt="modal-image" fluid/>
      <div class="modal-align-center">
        <h3>{{ modal.title }}</h3>
        <p>
         {{ modal.message }}<br/>
          <b>
            {{ modal.trailingMessage }}
          </b>
        </p>
        <b-button type="button" @click="hideModal" size="sm" variant="none" class="primary">
          {{ modal.button }}
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>

import { required, minLength, email, maxLength, sameAs, numeric } from "vuelidate/lib/validators";
import { hasLowerCase, hasUpperCase, hasNumber, fullNameValid } from "../validator";
import Vue from "vue";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

export default {
  name: "SignUpForm",
  props: {
    inputWidth: Number
  },
  data() {
    return {
      show: true,
      isLoggedin: false,
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
        message: "",
        trailingMessage: "",
        image: "",
        button: ""
      }
    };
  },
  validations: {
    form: {
      username: {
        required, minLength: minLength(1), maxLength: maxLength(150)
      },
      fullname: {
        required, fullNameValid
      },
      number: {
        required, numeric, minLength: minLength(10), maxLength: maxLength(20)
      },
      email: {
        required, email
      },
      password: {
        required, minLength: minLength(8), hasLowerCase, hasUpperCase, hasNumber
      },
      passwordValidation: {
        required, sameAsPassword: sameAs("password")
      }
    }
  },
  methods: {
    touchForm(name) {
      this.$v.form[name].$touch();
    },
    registrationSuccess(value) {
      this.modal.title = "Registration Success"
      this.modal.image = require('../assets/img/success-email.png');
      this.modal.message = value + " telah bergabung di hafidzisme";
      this.modal.trailingMessage = "Silahkan cek email untuk aktivasi akun!";
      this.modal.button = "Go to login page";
      this.$bvModal.show("registration-modal");
    },
    registrationFailure(value, secondValue) {
      this.modal.title = "Registration Failure"
      this.modal.image = require('../assets/img/success-selection.png');
      this.modal.message = value;
      this.modal.trailingMessage = secondValue;
      this.modal.button = "Try Again";
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
        this.postForm();
      }
    },
    postForm() {
      this.$axios.post( process.env.VUE_APP_URL + "/api/auth/users/", {
        "username": this.form.username,
        "email": this.form.email,
        "password": this.form.password,
        "re_password": this.form.passwordValidation,
        "first_name": this.form.fullname.split()[0],
        "last_name": this.form.fullname.split()[1],
        "whatsapp_number": this.form.number,
      })
      .then(() => {
        this.isLoggedin = true;
        this.registrationSuccess(this.form.username);
      })
      .catch(error => {
        if (error.response.data.username) {
          this.registrationFailure("Please try again!", error.response.data.username[0]);
        } else {
          this.registrationFailure("Please try again latter", "Website temporarily unavailable");
        }
      });
    }
  },
  computed: {
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
  border-radius: 20px;
}
.modal-align-center {
  text-align: center;
}
.modal-align-center h3 {
  font-family: "poppins";
  font-weight: 600;
  font-size: 24px;
  color: $primary;
}

.modal-align-center p {
  margin-top: 5%;
  font-family: "poppins";
  font-size: 12px;
}
img.responsive-image {
  margin-bottom: 5%;
}
</style>