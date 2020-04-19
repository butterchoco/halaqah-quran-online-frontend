<template>
  <div class="page-container vector-background col center">
    <MessagePage
      :isPrimary="isPrimary"
      :isDanger="isDanger"
      :img="img"
      :title="title"
      :msg="msg"
      :msg2="msg2"
      :goto="goto"
    />
  </div>
</template>

<script>
import MessagePage from "@/components/ErrorPage.vue";

export default {
  name: "PengumumanPage",
  components: { MessagePage },
  data() {
    return {
      img: require("@/assets/img/failed-selection.png"),
      title: "Pendaftaran program sudah ditutup!",
      isPrimary: false,
      isDanger: true,
      msg: "Waktu pendaftaran sudah habis. Silakan tunggu proses seleksi.",
      msg2: "",
      goto: [{ str: "Kembali ke beranda", link: "/" }]
    };
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  min-height: inherit;
}
</style>
