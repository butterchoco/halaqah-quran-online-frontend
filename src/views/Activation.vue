<template>
  <section class="main-container vector-background col center">
    <ErrorPage :img="img" :title="title" :msg="msg" :goto="goto" />
  </section>
</template>

<script>
import ErrorPage from "@/components/ErrorPage.vue";
export default {
  name: "ActivationPage",
  components: { ErrorPage },
  data() {
    return {
      img: "",
      title: "",
      isPrimary: false,
      msg: "",
      goto: {}
    };
  },
  methods: {
    isActivated() {
      this.img = require("../assets/img/success-selection.png");
      this.title = "Selamat akun anda sudah aktif!";
      this.isPrimary = true;
      this.msg = "Silahkan login untuk melanjutkan menggunakan aplikasi";
      this.goto = { str: "Go to login page", link: "/" };
    },
    isExpired() {
      this.img = require("../assets/img/failed-selection.png");
      this.title = "Link aktivasi akun expired";
      this.isPrimary = true;
      this.msg = "Silahkan kirim ulang verifikasi email";
      this.goto = { str: "Resend Verification", link: "#" };
    }
  },
  created() {
    this.$axios
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

<style lang="scss" scoped>
</style>
