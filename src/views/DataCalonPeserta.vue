<template>
  <div>
    <div v-if="isSelector">
      <div v-if="datacalon">
        <div class="table-container col center">
          <h3 class="header-title">Data Calon Peserta</h3>
          <table id="table-calon-peserta">
            <tr>
              <th>Nama</th>
              <th>Username</th>
              <th>Rekaman</th>
              <th>Action</th>
            </tr>
            <tr v-for="(data, index) in datacalon" :key="index">
              <td>{{ data.display_name }}</td>
              <td>{{ data.username }}</td>
              <td>
                <a href="data.recording">Download Recording</a>
              </td>
              <td>
                <button class="btn" @click="toggleModal(data)">Nilai Laporan</button>
              </td>
            </tr>
          </table>
        </div>
        <div v-if="isModal" class="modal-container">
          <div class="modal-overlay">
            <div class="modal">
              <div class="close-btn" @click="toggleModal()">x</div>
              <div class="modal-header">
                <h3 class="header-title">Seleksi Peserta</h3>
                <p class="header-title">Peserta: {{studentModalName}}</p>
              </div>
              <div class="modal-content">
                <div class="registration-form">
                  <form @submit="handleSubmit" method="post">
                    <label>Kesalahan Harakat</label>
                    <input required type="text" v-model="form.harakatMistake" />
                    <label for="mad-mistake">Kesalahan Panjang Pendek</label>
                    <input required type="text" v-model="form.madMistake" />
                    <label for="gunnah-mistake">Kesalahan Gunnah</label>
                    <input required type="text" v-model="form.gunnahMistake" />
                    <label for="lulus-checkbox">Lulus/Tidak Lulus</label>
                    <input type="checkbox" v-model="form.isLulus" />
                    <label for="level">Level Tahsin Yang Disarankan(Optional)</label>
                    <input type="text" v-model="form.levelTahsin" />
                    <label for="catatan">Catatan</label>
                    <textarea placeholder="Isi catatan untuk murid ini" v-model="form.catatan"></textarea>
                    <button type="submit">Submit</button>
                  </form>
                </div>
                <div class="bottom"></div>
              </div>
              <div class="modal-footer"></div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>Belum ada pendaftar</div>
    </div>
    <div v-else>Kamu tidak memiliki hak akses ke halaman ini.</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "DataCalonPeserta",
  data() {
    return {
      periodId: "",
      datacalon: "",
      isModal: false,
      isSelector: false,
      studentModalName: "",
      studentUserName: "",
      form : {
        harakatMistake: "", 
        madMistake: "", 
        gunnahMistake: "", 
        isLulus: false, 
        levelTahsin: 0, 
        catatan:""}
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["getCalonPeserta", "getAccessToken", "getRefreshToken"])
  },
  methods: {
    toggleModal(dataStudent) {
      this.isModal = !this.isModal;
      this.studentModalName = dataStudent.display_name;
      this.studentUserName = dataStudent.username;
    },
    handleSubmit(event) {
      event.preventDefault();
      const token = this.$store.getters.getAccessToken;
      axios.get(process.env.VUE_APP_URL + "/api/auth/users/me/", {
            headers: {
              Authorization: "JWT " + token
            }}).then(response => {
              const userId = response.data.id; 
              let studentId = "";
              for (let i = 0; i < this.datacalon.length; i++) {
                if (this.datacalon[i].username == this.studentUserName) {
                  studentId = this.datacalon[i].id;
                  break;
                }
              }
              axios.post(process.env.VUE_APP_URL + "/selection/participant/?id=" + studentId,
                {

                  "evaluator": userId, 
                    "harakat_mistake": this.form.harakatMistake, 
                    "mad_mistake": this.form.madMistake, 
                    "gunnah_mistake": this.form.gunnahMistake,
                    "tahsin_level":this.form.levelTahsin,
                    "is_passed": this.form.isLulus,
                    "note": this.form.catatan 
                },{
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "JWT " + token
                },
            });
      });
    },
    getData() {
      const token = this.$store.getters.getAccessToken;
      if (token) {
        axios
          .get(process.env.VUE_APP_URL + "/api/auth/users/me/roles/", {
            headers: {
              Authorization: "JWT " + token
            }
          })
          .then(response => {
            let selector = false;
            for (let i = 0; i < response.data.roles.length; i++) {
              if (
                response.data.roles[i].role_id == 3 ||
                response.data.roles[i].role_id == 4
              ) {
                selector = true;
              }
            }
            if (selector) {
              this.isSelector = true;
              axios
                .get(
                  process.env.VUE_APP_URL + "/api/tahfidz/selections/latest/"
                )
                .then(response => {                  
                  this.periodId = response.data.latest_opened.id;
                  axios.defaults.headers.common["Authorization"] = token;
                  axios
                    .get(
                      process.env.VUE_APP_URL +
                        "/api/tahfidz/selections/" +
                        this.periodId +
                        "/users/",
                      {
                        headers: {
                          Authorization: "JWT " + token
                        }
                      }
                    )
                    .then(response => {
                      this.datacalon = response.data.candidates;
                    });
                }).catch(error => {
                  alert("Belum ada periode yang buka")
                });
            } else {
              this.isSelector = false;
              window.location.pathname = "/";
            }
          });
      } else {
        this.isSelector = false;
        window.location.pathname = "/";
      }
    }
  }
};
</script>

<style lang="scss" scope>
@import "@/styles/programRegistrationForm.scss";

.header-title {
  text-align: center;
  color: #000;
  margin-top: $gap-m-2;
  margin-bottom: $gap-m-2;
}

.hero-message {
  max-width: 20rem;
}

.table-container {
  min-width: 20%;
  max-height: 40%;
  padding-left: 10%;
  padding-right: 10%;
}

#table-calon-peserta {
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  vertical-align: center;
}

#table-calon-peserta td,
#table-calon-peserta th {
  border: 1px solid #ddd;
  padding: 8px;
}

#table-calon-peserta th {
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: $primary;
  color: white;
}

.modal-container {
  position: absolute;
  width: 50vw;
  height: 50vh;

  .modal-overlay {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
  }

  .modal {
    position: absolute;
    min-width: 100px;
    min-height: 100px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    padding: $gap-m-2;

    .modal-header {
      text-align: left;
    }

    .modal-content {
      flex: 1;
      width: 100%;

      p {
        word-wrap: break-word;
        white-space: pre-wrap;
      }
      .top {
        margin-top: $gap-m-2;
        display: grid;
        grid-template-columns: repeat(3, 33%);

        .col {
          .description {
            margin: $gap-sm-1;
            text-align: center;
            font-size: 12px;
          }
        }
      }
    }

    .close-btn {
      float: right;
      margin: 0 $gap-sm-1 $gap-sm-4 auto;
      font-weight: bold;
      font-family: "Consolas";
      cursor: pointer;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
