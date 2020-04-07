<template>
  <div class="pengumuman-container vector-background col center">
    <MessagePage
      :img="img"
      :title="title"
      :msg="msg"
      :msg2="msg2"
      :isPrimary="isPrimary"
      :isDanger="isDanger"
      :goto="goto"
    />
  </div>
</template>

<script>
import MessagePage from "@/components/ErrorPage.vue";
import { mapGetters } from "vuex";
import router from "@/router";

export default {
  name: "AnnouncementSuccess",
  components: { MessagePage },
  data() {
    return {
      img: require("@/assets/img/success-selection.png"),
      title: "Selamat Anda Lulus Program!",
      isPrimary: true,
      isDanger: false,
      isLihatNilai: false,
      msg: "Silahkan pilih jadwal untuk melanjutkan.",
      msg2: "",
      regisEvaluation: {},
      goto: [{ str: "Pilih Jadwal", link: "/" }]
    };
  },
  created() {
    if (!this.getAnnouncementAvailable) {
      router.push("/");
    }
  },
  computed: {
    ...mapGetters({
      getAnnouncementAvailable: "getAnnouncementAvailable"
    })
  }
};
</script>

<style lang="scss" scoped>
.pengumuman-container {
  min-height: inherit;
}
</style>
