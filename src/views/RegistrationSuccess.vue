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
      msg2:
        "Pengumuman proses seleksi akan diumumkan dalam " +
        this.getPeriodEnd +
        " hari ke depan.",
      goto: [],
      pathTo: {
        0: "/forbidden/login",
        3: "/forbidden/role",
        4: "/forbidden/role",
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
      getHasProgramRegistered: "getHasProgramRegistered",
      getPeriodEnd: "getPeriodEnd"
    })
  },
  created() {
    if (!this.getRegistrationPeriodOpened) {
      this.gotoRegisClosed();
    }
    if (!this.getHasProgramRegistered) {
      this.gotoProgramRegistration();
    }
    this.msg2 =
      "Pengumuman proses seleksi akan diumumkan pada " +
      new Date(this.getPeriodEnd)
        .toLocaleString("en-GB", { timeZone: "UTC" })
        .split(",")[0];
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  min-height: inherit;
}
</style>
