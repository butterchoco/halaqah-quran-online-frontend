<template>
  <div class="pengumuman-container col center">
    <section class="maintenance-container col center">
      <MessagePage :img="img" :title="title" :msg="msg" :goto="goto" />
    </section>
  </div>
</template>

<script>
import MessagePage from "@/components/MessagePage.vue";
export default {
  name: "PenerimaanProgram",
  components: { MessagePage },
  data() {
    return {
      img: require("@/assets/img/success-selection-1.png"),
      title: "Selamat Anda Lulus Program!",
      msg: "Silahkan pilih jadwal untuk melanjutkan.",
      goto: [{ str: "Pilih Jadwal", link: "/" }]
    };
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
