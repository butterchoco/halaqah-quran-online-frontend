<template>
  <div class="page-container vector-background col center">
    <MessagePage :img="img" :title="title" :msg="msg" :msg2="msg2" :goto="goto" />
  </div>
</template>

<script>
import MessagePage from "@/components/ErrorPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "PengumumanPage",
  components: { MessagePage },
  data() {
    return {
      img: require("@/assets/img/registration-success.png"),
      title: "Selamat Proses Daftar Berhasil!",
      isPrimary: true,
      isDanger: false,
      msg: "Mohon menunggu proses seleksi.",
      msg2: "Pengumuman proses seleksi akan diumumkan dalam 7 hari ke depan.",
      goto: [],
      pathTo: {
        0: "/login-forbidden",
        3: "/forbidden",
        4: "/forbidden",
        5: "/program-registration"
      }
    };
  },
  methods: {
    gotoRegisClosed() {
      router.push("/regis-closed");
    },
    gotoProgramRegistration() {
      router.push("/program-registration");
    }
  },
  computed: {
    ...mapGetters({
      getRegistrationPeriodOpened: "getRegistrationPeriodOpened",
      getHasProgramRegistered: "getHasProgramRegistered"
    })
  },
  created() {
    if (!this.getRegistrationPeriodOpened) {
      this.gotoRegisClosed();
    }
    if (!this.getHasProgramRegistered) {
      this.gotoProgramRegistration();
    }
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  min-height: inherit;
}
</style>
