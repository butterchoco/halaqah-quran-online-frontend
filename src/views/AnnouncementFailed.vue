<template>
  <div class="pengumuman-container vector-background col center">
    <MessagePage
      :img="img"
      :title="title"
      :msg="msg"
      msg2
      :goto="goto"
      :isPrimary="isPrimary"
      :isDanger="isDanger"
    />
    <p class="message">
      {{ msg2 }}
      <strong>level {{ getTahsinLevel }}</strong>
    </p>
    <button id="show-btn" class="score btn" @click="modalShow = !modalShow">Lihat Nilai</button>
    <b-modal v-model="modalShow" class="modal" hide-footer centered :title="getFullname">
      <b-row class="content">
        <b-col
          class="scores center"
          v-for="(data, index) in getRegisEvaluation.report"
          :key="index"
        >
          <h1>{{data.content}}</h1>
          <p>{{data.title}}</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>{{ getRegisEvaluation.note }}</b-col>
      </b-row>
      <b-button class="close mt-3" block @click="modalShow = !modalShow">Tutup</b-button>
    </b-modal>
  </div>
</template>

<script>
import MessagePage from "@/components/ErrorPage.vue";
import { mapGetters } from "vuex";
import router from "@/router";

export default {
  name: "AnnouncementFailed",
  components: { MessagePage },
  data() {
    return {
      img: require("@/assets/img/failed-selection.png"),
      title: "Mohon Maaf Anda Belum Lulus Program!",
      isDanger: true,
      isPrimary: false,
      isLihatNilai: true,
      msg: "Kami sarankan untuk tahsin dulu ya kak :)",
      msg2: "Level tahsin yang sesuai adalah",
      level: "2",
      regisEvaluation: "",
      goto: [],
      modalShow: false
    };
  },
  created() {
    this.regisEvaluation = this.getRegisEvaluation;
    if (!this.getAnnouncementAvailable) {
      router.push("/");
    }
  },
  computed: {
    ...mapGetters({
      getTahsinLevel: "getTahsinLevel",
      getRegisEvaluation: "getRegisEvaluation",
      getFullname: "getFullname",
      getAnnouncementAvailable: "getAnnouncementAvailable"
    })
  }
};
</script>

<style lang="scss" scoped>
.pengumuman-container {
  min-height: inherit;
}

button.score {
  margin-top: $gap-m-2;
}

.scores {
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 6rem;

  h1 {
    flex: 1;
  }

  p {
    flex: 1.2;
  }
}
</style>
