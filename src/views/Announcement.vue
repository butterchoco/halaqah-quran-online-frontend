<template>
  <div class="primary-container vector-background col center">
    <ErrorMaintenance :img="img" :title="title" :msg="msg" :goto="goto" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ErrorMaintenance from "@/components/ErrorPage";
import User from "@/services/User";
import router from "@/router";

export default {
  name: "Announcement",
  components: {
    ErrorMaintenance
  },
  computed: {
    ...mapGetters({
      getIsAccepted: "getIsAccepted",
      getRegisEvaluation: "getRegisEvaluation",
      getAccessToken: "getAccessToken",
      getSelectionPeriodId: "getSelectionPeriodId",
      getAnnouncementAvailable: "getAnnouncementAvailable",
      getIsPassed: "getIsPassed"
    })
  },
  data() {
    return {
      img: require("@/assets/img/404-not-found.png"),
      title: "Tidak ada pengumuman",
      msg: "Silahkan menunggu beberapa hari lagi !",
      goto: [
        {
          link: "/",
          str: "Back to home"
        }
      ]
    };
  },
  created() {
    User.getAnnouncementReport(
      process.env.VUE_APP_URL,
      this.getAccessToken,
      this.getSelectionPeriodId
    )
      .then(() => {
        if (this.getIsPassed) {
          router.push("/announcement-success");
        } else {
          router.push("/announcement-failed");
        }
      })
      .catch(error => {
        if (error.response.status == 401) {
          router.push("/login-forbidden");
        }
      });
  }
};
</script>

<style lang="scss" scoped>
.primary-container {
  min-height: inherit;
}
</style>
