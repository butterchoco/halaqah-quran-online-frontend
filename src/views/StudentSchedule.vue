<template>
  <section class="student-schedule-container vector-background">
    <b-container>
      <b-row align-h="center">
        <b-col sm="12" md="8">
          <h3 class="header-title">Pilih Jadwal Setoran</h3>
          <b-calendar
            block
            hide-header
            class="calendar"
            v-model="selectedDate"
            initial-date="2020-03-20"
            @click.native="addSelectedDate"
            locale="en"
          ></b-calendar>
        </b-col>
        <b-col sm="12" md="4">
          <div class="detail-pilihan-container">
            <h3 class="header-title">Detail Pilihan</h3>
            <p class="no-date" v-if="listSelectedDate.length == 0">Kamu belum memilih jadwal</p>
            <div class="detail-pilihan-wrapper">
              <div
                class="detail-pilihan-card"
                v-for="(data, index) in listSelectedDate"
                :key="index"
              >
                <div class="selected-date">
                  <p class="date">{{data.date}}</p>
                </div>
                <div class="detail-wrapper">
                  <p class="time">{{data.time}}</p>
                  <p class="teacher">{{data.teacher}}</p>
                </div>
                <button class="detail btn">Detail</button>
              </div>
            </div>
            <button class="submit btn primary">Submit</button>
          </div>
        </b-col>
      </b-row>
      <b-modal
        v-model="isModal"
        class="modal"
        size="sm"
        hide-footer
        centered
        no-close-on-backdrop
        header-class="modal-header-student-schedule"
        :title="selectedDate"
      >
        <div class="modal-footer">
          <button @click="cancelJoin" class="btn">Batal</button>
          <button @click="joinClass" class="btn primary">Ikut</button>
        </div>
      </b-modal>
    </b-container>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      dateMin: this.getPeriodStart,
      dateMax: this.getPeriodEnd,
      selectedDate: "",
      form: {
        date: "",
        time: "",
        teacher: ""
      },
      listSelectedDate: [],
      availableDate: [],
      isModal: false
    };
  },
  methods: {
    joinClass() {
      this.listSelectedDate.push(this.form);
      this.isModal = false;
      this.selectedDate = "";
    },
    cancelJoin() {
      this.isModal = false;
      this.selectedDate = "";
    },
    addSelectedDate() {
      if (this.selectedDate != "") {
        this.isModal = true;
      } else {
        this.initiateDate();
      }
    },
    initiateDate() {
      document
        .querySelectorAll(
          ".b-calendar-grid-body .row.no-gutters div[role='button'"
        )
        .forEach(btn => {
          btn.classList.add("disable");
        });
      for (let i = 0; i < this.availableDate.length; i++) {
        const date = document.querySelector(
          "div[data-date='" + this.availableDate[i].date + "']"
        );
        if (date != null) {
          date.classList.add("available");
          date.classList.remove("disable");
        }
      }
    }
  },
  mounted() {
    this.initiateDate();
  },
  computed: {
    ...mapGetters({
      getPeriodStart: "getPeriodStart",
      getPeriodEnd: "getPeriodEnd"
    })
  }
};
</script>

<style lang="scss" scoped>
.btn {
  margin-left: $gap-sm-2;
}

.student-schedule-container {
  min-height: inherit;

  .header-title {
    font-weight: bold;
    margin: $gap-m-1 0;
  }

  .container {
    min-height: inherit;
    padding-top: $gap-m-2;
  }

  b-row {
    min-height: inherit;
  }

  b-col {
    min-height: inherit;
  }

  .detail-pilihan-container {
    padding: $gap-m-1;
    box-shadow: 0 0 6px rgba($color: #aaa, $alpha: 0.12);
    border-radius: 10px;
    display: flex;
    flex-direction: column;

    .detail-pilihan-wrapper {
      padding: 0 $gap-sm-2;
      border-radius: 20px;
      overflow-y: scroll;
      max-height: 600px;
      scrollbar-width: 0;
      &::-webkit-scrollbar {
        display: none;
      }
    }

    .no-date {
      text-align: center;
      margin: $gap-m-2 0;
    }

    .submit {
      margin: $gap-m-1 0 $gap-sm-2 0;
      align-self: flex-end;
    }

    .detail-pilihan-card {
      box-shadow: 0 0 6px rgba($color: #aaa, $alpha: 0.12);
      padding: $gap-m-1;
      border-radius: 10px;
      margin: $gap-m-2 0;
      display: flex;
      flex-direction: column;

      .selected-date {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: $gap-m-1;

        p {
          padding: $gap-sm-1 $gap-sm-2;
          background: $primary;
          color: $white;
          border-radius: 10px;
        }
      }

      .detail-wrapper {
        margin-bottom: $gap-sm-2;

        .time {
          font-weight: 600;
        }
      }

      button.detail {
        align-self: flex-end;
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .student-schedule-container {
    padding: 5vh 0 10vh 0;
  }
}
</style>