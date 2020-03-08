<template>
  <div class="page-container col center">
    <section class="maintenance-container col center">
      <MessagePage
        :isPrimary="isPrimary"
        :isDanger="isDanger"
        :img="img"
        :title="title"
        :msg="msg"
        :msg2="msg2"
        :goto="goto"
      />
    </section>
  </div>
</template>

<script>
import MessagePage from "@/components/MessagePage.vue";

export default {
  name: "PengumumanPage",
  components: { MessagePage },
  data() {
    return {
      img: require("@/assets/img/registration-success.png"),
      title: "Selamat Proses Daftar Berhasil!",
      isPrimary: true,
      msg: "Mohon menunggu proses seleksi.",
      msg2: "Pengumuman proses seleksi akan diumumkan dalam 7 hari ke depan."
    };
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  min-width: 20%;
  max-height: 40%;
}
.maintenance-container {
  overflow: hidden;
}
</style>
