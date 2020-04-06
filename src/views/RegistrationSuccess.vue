<template>
  <div class="page-container vector-background col center">
    <MessagePage :img="img" :title="title" :msg="msg" :msg2="msg2" :goto="goto" />
  </div>
</template>

<script>
import MessagePage from "@/components/ErrorPage.vue";

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
      goto: []
    };
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  min-height: inherit;
}
</style>
