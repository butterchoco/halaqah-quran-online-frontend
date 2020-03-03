<template>
  <div class="pengumuman-container col center">
    <section class="pengumuman-container col center">
      <MessagePage
        :isPrimary="isPrimary"
        :isDanger="isDanger"
        :img="img"
        :title="title"
        :msg="msg"
        :msg2="msg2"
        :dataModal="regisEvaluation"
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
import { mapGetters } from "vuex";

export default {
  name: "PengumumanPage",
  components: { MessagePage },
  computed: {
    ...mapGetters(["getIsAccepted", "getRegisEvaluation"])
  },
  data() {
    if (this.$store.getters.getIsAccepted) {
      return {
        img: require("@/assets/img/success-selection-1.png"),
        title: "Selamat Anda Lulus Program!",
        isPrimary: true,
        isDanger: false,
        msg: "Silahkan pilih jadwal untuk melanjutkan.",
        msg2: "",
        regisEvaluation: {},
        goto: [{ str: "Pilih Jadwal", link: "/" }]
      };
    } else {
      return {
        img: require("@/assets/img/failed-selection.png"),
        title: "Mohon Maaf Anda Belum Lulus Program!",
        isDanger: true,
        isPrimary: false,
        isLihatNilai: true,
        msg: "Kami sarankan untuk tahsin dulu ya kak :)",
        msg2: "Level tahsin yang sesuai adalah Level 2",
        regisEvaluation: this.$store.getters.getRegisEvaluation,
        goto: [{ str: "Lihat Nilai", link: "" }]
      };
    }
  }
};
</script>

<style lang="scss">
.pengumuman-container {
  min-width: 20%;
  max-height: 40%;
}
.pengumuman-container {
  overflow: hidden;
}
</style>
