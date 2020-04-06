<template>
  <div class="primary-container col center">
    <section class="secondary-container col center">
      <b-img :src="img" alt="Message" fluid />
      <h3 id="first_balancer">{{ title }}</h3>
      <p>{{ msg }}</p>
      <p v-if="!isAccepted">{{ msgTrailing }}</p>
      <b-button
        v-if="!isAccepted"
        v-on:click="showModal"
        id="second_balancer"
        variant="none"
        class="primary"
      >{{ msgButton }}</b-button>
      <b-button v-else id="second_balancer" variant="none" class="primary">{{ msgButton }}</b-button>
    </section>
    <Background />
    <b-modal id="testResult-modal" size="lg" centered hide-footer>
      <div class="modal-sub-body">
        <h3>Evaluator : {{ testResult.name }}</h3>
        <b-row>
          <b-col>
            <h1 class="header-mistake">{{ testResult.harakatMistake }}</h1>
            <h4 class="subheader-mistake">Harakat Mistake</h4>
          </b-col>
          <b-col>
            <h1 class="header-mistake">{{ testResult.madMistake }}</h1>
            <h4 class="subheader-mistake">Mad Mistake</h4>
          </b-col>
          <b-col>
            <h1 class="header-mistake">{{ testResult.gunnahMistake }}</h1>
            <h4 class="subheader-mistake">Gunnah Mistake</h4>
          </b-col>
        </b-row>
        <p>{{ testResult.msg }}</p>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import Background from "@/components/Backgrounds/second_background";

export default {
  name: "RegistrationSelection",
  components: {
    Background
  },
  computed: {
    ...mapGetters([
      "getIsAccepted",
      "getRegisEvaluation",
      "getAccessToken",
      "getSelectionPeriod"
    ])
  },
  data() {
    return {
      isAccepted: false,
      img: "",
      title: "",
      msg: "",
      msgTrailing: "",
      msgButton: "",
      testResult: {
        name: "",
        harakatMistake: 0,
        madMistake: 0,
        gunnahMistake: 0,
        msg: ""
      }
    };
  },
  created() {
    const selectionPeriod = this.getSelectionPeriod;
    axios
      .get(
        process.env.VUE_APP_URL +
          "/api/tahfidz/selections/" +
          selectionPeriod +
          "/me/status/",
        {
          headers: {
            Authorization: "JWT " + this.getAccessToken
          }
        }
      )
      .then(response => {
        if (response.data.registration_status.is_passed) {
          this.addSucceededProgram();
        } else {
          this.addFailedProgram(response.data.registration_status);
        }
      })
      .catch(error => {
        // pass
      });
  },
  methods: {
    addSucceededProgram() {
      (this.isAccepted = true),
        (this.img = require("@/assets/img/success-selection-1.png")),
        (this.title = "Congratulations you passed the test!"),
        (this.msg = "Please set the schedule to continue."),
        (this.msgButton = "Set Schedule");
    },
    addFailedProgram(data) {
      (this.isAccepted = false),
        (this.img = require("@/assets/img/failed-selection.png")),
        (this.title = "Sorry You Have Not Passed the Program!"),
        (this.msg = "We suggest to take tahsin class first,"),
        (this.msgTrailing =
          "The appropriate tahsin class for you is tahsin level " +
          data.tahsin_level),
        (this.msgButton = "Test Result");
      this.testResult.name = data.evaluator_name;
      this.testResult.harakatMistake = data.harakat_mistake;
      this.testResult.madMistake = data.mad_mistake;
      this.testResult.gunnahMistake = data.gunnah_mistake;
      this.testResult.msg = data.note;
    },
    showModal() {
      this.$bvModal.show("testResult-modal");
    }
  }
};
</script>

<style lang="scss">
.primary-container {
  min-width: 20%;
  max-height: 40%;

  .secondary-container {
    overflow: hidden;
  }

  #first_balancer {
    margin-top: 1%;
    margin-bottom: 1%;
  }

  #second_balancer {
    margin-top: 2% !important;
  }
}
.modal-sub-body {
  padding: 16px !important;
  .col {
    text-align: center;
  }
  h1.header-mistake {
    font-size: 56px;
    margin-top: 10%;
    margin-bottom: 10%;
  }
  h4.subheader-mistake {
    font-weight: normal;
  }
  p {
    margin-top: 5%;
  }
}
</style>
