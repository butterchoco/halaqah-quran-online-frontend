<template>
  <div class="pengumuman-container col center">
    <section class="maintenance-container col center">
      <MessagePage v-if="!msg2" :img="img" :title="title" :msg="msg" :msg2="msg2" :goto="goto" />
      <MessagePage v-if="msg2" :img="img" :title="title" :msg="msg" :msg2="msg2" :goto="goto" />
    </section>
  </div>
</template>

<script>
import MessagePage from "@/components/MessagePage.vue";
import { mapGetters } from "vuex";

export default {
  name: "PengumumanPage",
  components: { MessagePage },
  computed: {
    ...mapGetters(["getIsAccepted"])
  },
  data() {
    if (this.$store.getters.getIsAccepted) {
      return {
        img: require("@/assets/img/success-selection-1.png"),
        title: "Selamat Anda Lulus Program!",
        msg: "Silahkan pilih jadwal untuk melanjutkan.",
        goto: [{ str: "Pilih Jadwal", link: "/" }]
      };
    } else {
      return {
        img: require("@/assets/img/failed-selection.png"),
        title: "Mohon Maaf Anda Belum Lulus Program!",
        msg: "Kami sarankan untuk tahsin dulu ya kak :)",
        msg2: "Level tahsin yang sesuai adalah Level 2",
        goto: [{ str: "Lihat Nilai", link: "/" }]
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
.maintenance-container {
  overflow: hidden;
}
</style>
