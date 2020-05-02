<template>
  <section class="main-container vector-background col center">
    <ErrorPage
      :isPrimary="isPrimary"
      :isDanger="isDanger"
      :img="img"
      :title="title"
      :msg="msg"
      :goto="goto"
    />
  </section>
</template>

<script>
import ErrorPage from "@/components/ErrorPage.vue";
import User from "@/services/User";

export default {
  name: "ActivationPage",
  components: { ErrorPage },
  data() {
    return {
      img: "",
      title: "",
      msg: "",
      isPrimary: false,
      isDanger: true,
      goto: [
        {
          str: "",
          link: ""
        }
      ]
    };
  },
  methods: {
    isActivated() {
      this.img = require("@/assets/img/success-selection.png");
      this.title = "Selamat akun anda sudah aktif!";
      this.isPrimary = true;
      this.isDanger = false;
      this.msg = "Silahkan login untuk melanjutkan menggunakan aplikasi";
      this.goto = [{ str: "Go to login page", link: "/sign/in" }];
    },
    isExpired() {
      this.img = require("@/assets/img/failed-selection.png");
      this.title = "Link aktivasi akun expired";
      this.isPrimary = false;
      this.isDanger = true;
      this.msg = "Silahkan kirim ulang verifikasi email";
      this.goto = [{ str: "Resend Verification", link: "#" }];
    }
  },
  created() {
    User.getActivation(process.env.VUE_APP_URL, this.$route.params)
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
