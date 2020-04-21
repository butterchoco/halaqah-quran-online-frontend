<template>
  <section class="student-schedule-container vector-background">
    <b-container>
      <b-alert
        :show="this.form.success"
        dismissible
        fade
        variant="success"
      >Berhasil menambahkan jadwal !</b-alert>
      <b-alert :show="this.form.fail" dismissible fade variant="danger">Gagal menambahkan jadwal !</b-alert>
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
                  <p class="time">{{data.detail.time}}</p>
                  <p class="teacher">Ust. {{data.detail.teacher.first_name}}</p>
                </div>
                <button class="detail btn">Detail</button>
              </div>
            </div>
            <button v-if="listSelectedDate.length != 0" class="submit btn primary">Selanjutnya</button>
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
        <div class="modal-content">
          <b-form @submit.stop.prevent="handleSubmit(studentModal)">
            <b-row>
              <b-col>
                <b-form-group id="time-group" label="Waktu" label-for="time">
                  <b-form-select id="time" v-model="timeId" :options="timeOption" required>
                    <template v-slot:first>
                      <b-form-select-option :value="null" disabled>Pilih Opsi</b-form-select-option>
                    </template>
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
          </b-form>
        </div>
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
import User from "@/services/User";
import router from "@/router";

export default {
  data() {
    return {
      dateMin: this.getPeriodStart,
      dateMax: this.getPeriodEnd,
      selectedDate: "",
      form: {
        date: "",
        detail: "",
        success: false,
        fail: false
      },
      timeId: "",
      timeOption: [],
      listSelectedDate: [],
      availableDate: {},
      isModal: false
    };
  },
  methods: {
    joinClass() {
      this.form.date = this.selectedDate;
      this.form.detail = this.availableDate[this.selectedDate].find(
        ({ id }) => id == this.timeId
      );
      User.sendStudentSchedule(
        process.env.VUE_APP_URL,
        this.getAccessToken,
        this.form.detail.id
      )
        .then(() => {
          this.form.success = true;
          this.listSelectedDate.push(this.form);
        })
        .catch(() => {
          this.form.fail = true;
        });
      this.isModal = false;
      this.timeOption = [];
      this.selectedDate = "";
    },
    cancelJoin() {
      this.isModal = false;
      this.timeOption = [];
      this.selectedDate = "";
    },
    addSelectedDate() {
      if (this.selectedDate != "") {
        const date = this.availableDate[this.selectedDate];
        for (let i = 0; i < date.length; i++) {
          if (date[i].student == null) {
            this.timeOption.push({
              value: date[i].id,
              text: date[i].time
            });
          }
        }
        this.isModal = true;
      } else {
        this.printAvailableDate();
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
    },
    printAvailableDate() {
      for (const item in this.availableDate) {
        const isStudentNull =
          this.availableDate[item].find(({ student }) => student == null)
            .length != 0;
        const date = document.querySelector("div[data-date='" + item + "']");
        if (isStudentNull) {
          if (date != null) {
            date.classList.add("available");
            date.classList.remove("disable");
          }
        } else {
          if (date != null) {
            date.classList.add("halfAvailable");
            date.classList.remove("disable");
          }
        }
      }
    },
    pushResponseToData(response) {
      for (let i = 0; i < response.length; i++) {
        const date = new Date(response[i].start_datetime);
        const formatedtime = date.toLocaleTimeString();
        const formatedDate = date.toJSON().split("T")[0];
        if (this.availableDate[formatedDate] != null) {
          this.availableDate[formatedDate].push({
            id: response[i].id,
            time: formatedtime,
            teacher: response[i].teacher,
            student: response[i].student
          });
        } else {
          this.availableDate[formatedDate] = [
            {
              id: response[i].id,
              time: formatedtime,
              teacher: response[i].teacher,
              student: response[i].student
            }
          ];
        }
      }
    },
    async getAvailableDate() {
      await User.getTeacherAvailableSchedule(
        process.env.VUE_APP_URL,
        this.getTermName,
        this.getAccessToken
      ).then(response => {
        this.pushResponseToData(response);
      });
      this.initiateDate();
      this.printAvailableDate();
    },
    gotoLoginForbidden() {
      router.push("/forbidden/login");
    },
    gotoForbiddenPage() {
      router.push("/forbidden/role");
    },
    gotoPeriodForbidden() {
      router.push("/forbidden/period");
    }
  },
  created() {
    if (this.getUserRole[this.getUserRole.length - 1].role_id == 0) {
      this.gotoLoginForbidden();
    } else if (this.getUserRole[this.getUserRole.length - 1].role_id != 2) {
      this.gotoForbiddenPage();
    } else if (!this.getSchedulePeriodOpened) {
      this.gotoPeriodForbidden();
    } else {
      this.getAvailableDate();
    }
  },
  computed: {
    ...mapGetters({
      getPeriodStart: "getPeriodStart",
      getPeriodEnd: "getPeriodEnd",
      getTermName: "getTermName",
      getAccessToken: "getAccessToken",
      getUserRole: "getUserRole",
      getSchedulePeriodOpened: "getSchedulePeriodOpened"
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