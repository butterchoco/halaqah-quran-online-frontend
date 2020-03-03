<template>
  <div class="activation-container col center">
    <section class="main-container col center">
      <MessagePage
        :isPrimary="isPrimary"
        :img="img"
        :title="title"
        :msg="msg"
        :goto="goto"
      />
    </section>
    <img src="@/assets/img/vector-4.png" alt="vector" class="svg-4" />
    <img src="@/assets/img/vector-5.png" alt="vector" class="svg-5" />
    <img src="@/assets/img/vector-6.png" alt="vector" class="svg-6" />
    <img src="@/assets/img/vector-7.png" alt="vector" class="svg-7" />
  </div>
</template>

<script>
import MessagePage from "@/components/MessagePage.vue";
export default {
  name: "ActivationPage",
  components: { MessagePage },
  data() {
    return {
      img: "",
      title: "",
      isPrimary: false,
      msg: "",
      goto: []
    };
  },
  methods: {
    isActivated() {
      this.img = require("../assets/img/success-selection-1.png");
      this.title = "Selamat akun anda sudah aktif!";
      this.isPrimary = true;
      this.msg = "Silahkan login untuk melanjutkan menggunakan aplikasi";
      this.goto = [{ str: "Go to login page", link: "/" }];
    },
    isExpired() {
      this.img = require("../assets/img/failed-selection-2.png");
      this.title = "Link aktivasi akun expired";
      this.isPrimary = true;
      this.msg = "Silahkan kirim ulang verifikasi email";
      this.goto = [{ str: "Resend Verification", link: "#" }];
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

<style lang="scss">
.activation-container {
  min-width: 20%;
  max-height: 40%;

  .main-container {
    overflow: hidden;
  }
}
</style>
