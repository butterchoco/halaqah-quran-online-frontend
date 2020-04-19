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
      getPeriodId: "getPeriodId",
      getAnnouncementAvailable: "getAnnouncementAvailable",
      getIsPassed: "getIsPassed",
      getUserRole: "getUserRole"
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
  methods: {
    gotoAnnouncementSuccess() {
      router.push("/announcement-success");
    },
    gotoAnnouncementFailed() {
      router.push("/announcement-failed");
    },
    gotoLoginForbidden() {
      router.push("/login-forbidden");
    }
  },
  created() {
    User.getAnnouncementReport(
      process.env.VUE_APP_URL,
      this.getAccessToken,
      this.getPeriodId
    );
  },
  mounted() {
    if (this.getUserRole[this.getUserRole.length - 1].role_id != 1) {
      this.gotoLoginForbidden();
    } else if (this.getIsPassed) {
      this.gotoAnnouncementSuccess();
    } else {
      this.gotoAnnouncementFailed();
    }
  }
};
</script>

<style lang="scss" scoped>
.primary-container {
  min-height: inherit;
}
</style>
