<template>
  <section class="student-schedule-container vector-background">
    <b-container>
      <b-alert :show="this.success" dismissible fade variant="success">Berhasil melakukan aksi !</b-alert>
      <b-alert :show="this.fail" dismissible fade variant="danger">Gagal melakukan aksi !</b-alert>
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
                  <p>Waktu setoran:</p>
                  <p class="time">{{data.startTime}} - {{data.endTime}}</p>
                </div>
                <button class="detail btn" @click="detailJadwal(data.date, data.startTime)">Detail</button>
              </div>
            </div>
            <router-link v-if="listSelectedDate.length != 0" to="/">
              <button class="submit btn primary">Selanjutnya</button>
            </router-link>
          </div>
        </b-col>
      </b-row>
      <b-modal
        v-model="isDetailModal"
        class="modal"
        size="sm"
        hide-footer
        centered
        no-close-on-backdrop
        header-class="modal-header-student-schedule"
        :title="form.date"
      >
        <div class="modal-content">
          <b-form @submit.stop.prevent="handleSubmit(studentModal)">
            <b-row>
              <b-col>
                <p>Waktu setoran:</p>
                <p class="time">
                  <strong>{{form.startTime}} - {{form.endTime}}</strong>
                </p>
                <p>Siswa terdaftar :</p>
                <p class="student" v-if="form.student != null">
                  <strong>{{form.student.first_name + form.student.last_name}}</strong>
                </p>
                <p class="student">
                  <strong>Tidak ada peserta terdaftar</strong>
                </p>
              </b-col>
            </b-row>
          </b-form>
        </div>
        <div class="modal-footer">
          <button @click="cancelDelete" class="btn">Batal</button>
          <button @click="deleteClass" class="btn danger">Hapus</button>
        </div>
      </b-modal>

      <b-modal
        v-model="isAddScheduleModal"
        class="modal"
        size="sm"
        hide-footer
        centered
        no-close-on-backdrop
        header-class="modal-header-student-schedule"
        :title="form.date"
      >
        <div class="modal-content">
          <b-form @submit.stop.prevent="handleSubmit(studentModal)">
            <b-row>
              <b-col>
                <label for="startTime">Waktu mulai</label>
                <input
                  type="time"
                  id="start-time"
                  name="start-time"
                  min="06:00"
                  max="22:00"
                  step="600"
                  v-model="form.startTime"
                />
                <label for="startTime">Waktu berakhir</label>
                <input
                  type="time"
                  id="end-time"
                  name="end-time"
                  min="06:00"
                  max="22:00"
                  step="600"
                  v-model="form.endTime"
                />
              </b-col>
            </b-row>
          </b-form>
        </div>
        <div class="modal-footer">
          <button @click="cancelJoin" class="btn">Batal</button>
          <button @click="joinClass" class="btn primary">Tambah</button>
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
        id: "",
        date: "",
        startTime: "",
        endTime: "",
        teacher: "",
        student: null
      },
      success: false,
      fail: false,
      listSelectedDate: [],
      availableDate: {},
      isAddScheduleModal: false,
      isDetailModal: false
    };
  },
  methods: {
    detailJadwal(detailDate, detailTime) {
      this.form = this.listSelectedDate.find(
        ({ date, startTime }) => date == detailDate && startTime == detailTime
      );
      this.isDetailModal = true;
    },
    cancelDelete() {
      this.isDetailModal = false;
    },
    deleteClass() {
      if (this.form.student != null) return;
      User.deleteTeacherSchedule(
        process.env.VUE_APP_URL,
        this.getAccessToken,
        this.form.id
      )
        .then(() => {
          this.success = true;
          this.listSelectedDate.splice(
            this.listSelectedDate.find(({ id }) => id == this.form.id),
            1
          );
          this.printAvailableDate();
          this.isDetailModal = false;
        })
        .catch(() => {
          this.fail = true;
        });
    },
    joinClass() {
      const startDatetime = new Date(
        this.form.date + "T" + this.form.startTime
      );
      const endDateTime = new Date(this.form.date + "T" + this.form.endTime);
      this.form.teacher = this.getFullname;
      User.sendTeacherSchedule(
        process.env.VUE_APP_URL,
        this.getTermName,
        this.getAccessToken,
        startDatetime.toISOString(),
        endDateTime.toISOString()
      )
        .then(() => {
          this.success = true;
          this.listSelectedDate.push(this.form);
        })
        .catch(() => {
          this.fail = true;
        });
      this.isAddScheduleModal = false;
      this.selectedDate = "";
    },
    cancelJoin() {
      this.isAddScheduleModal = false;
      this.isDetailModal = false;
      this.selectedDate = "";
    },
    addSelectedDate() {
      if (this.selectedDate != "") {
        this.form.date = this.selectedDate;
        this.isAddScheduleModal = true;
      } else {
        this.printAvailableDate();
      }
    },
    printAvailableDate() {
      for (const item in this.availableDate) {
        const hasTeacherNull =
          this.availableDate[item].find(element => {
            return element.teacher == null;
          }) == undefined;
        const date = document.querySelector("div[data-date='" + item + "']");
        if (hasTeacherNull) {
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
        const startDate = new Date(response[i].start_datetime);
        const endDate = new Date(response[i].end_datetime);
        const formatedStartTime = startDate.toLocaleTimeString();
        const formatedEndTime = endDate.toLocaleTimeString();
        const formatedDate = startDate.toJSON().split("T")[0];
        if (this.availableDate[formatedDate] != null) {
          this.availableDate[formatedDate].push({
            id: response[i].id,
            time: formatedStartTime,
            teacher: response[i].teacher,
            student: response[i].student
          });
        } else {
          this.availableDate[formatedDate] = [
            {
              id: response[i].id,
              time: formatedStartTime,
              teacher: response[i].teacher,
              student: response[i].student
            }
          ];
        }
        if (response[i].teacher.username == this.getUsername) {
          this.listSelectedDate.push({
            id: response[i].id,
            date: formatedDate,
            startTime: formatedStartTime,
            endTime: formatedEndTime,
            teacher: this.getFullname,
            student: response[i].student
          });
        }
      }
    },
    async getAvailableDate() {
      await User.getTeacherSchedule(
        process.env.VUE_APP_URL,
        this.getTermName,
        this.getAccessToken
      ).then(response => {
        this.pushResponseToData(response);
      });
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
    User.getLatestPeriod(process.env.VUE_APP_URL);
    if (this.getUserRole[this.getUserRole.length - 1].role_id == 0) {
      this.gotoLoginForbidden();
    } else if (this.getUserRole[0].role_id != 3) {
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
      getUsername: "getUsername",
      getFullname: "getFullname",
      getFirstname: "getFirstname",
      getLastName: "getLastname",
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