<template>
  <div>
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
          <td>{{ data.recording }}</td>
          <td>
            <button class="btn" @click="toggleModal()">Nilai Laporan</button>
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
            <p class="header-title">Joko Anwar</p>
          </div>
          <div class="modal-content">
            <div class="registration-form">
              <div class="form-group col optional">
                <label for="harakatMistake-field">Kesalahan harakat</label>
                <select
                  name="harakatMistake-field"
                  id="harakatMistake-field"
                  @change="checkField"
                  v-model="harakatMistake"
                  placeholder="Pilih Opsi"
                  :class="{
                    error: isShowError && errors.harakatMistakeError[0]
                  }"
                >
                  <option disabled hidden value>Pilih Opsi</option>
                  <option selected value="1">1 Kesalahan</option>
                  <option value="2">2 Kesalahan</option>
                  <option value="3">3 Kesalahan</option>
                  <option selected value="4">4 Kesalahan</option>
                  <option value="5">5 Kesalahan</option>
                </select>
                <p v-if="isShowError" class="error">{{ errors.harakatMistakeError[0] }}</p>
              </div>
            </div>
            <div class="bottom"></div>
          </div>
          <div class="modal-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "DataCalonPeserta",
  computed: {
    ...mapGetters(["getCalonPeserta, getUSerToken"])
  },
  data() {
    return {
      periodId: "",
      datacalon: "",
      isModal: false
    };
  },
  created() {
    this.getData();
  },
  methods: {
    toggleModal() {
      this.isModal = !this.isModal;
    },
    getData() {
      const token = this.$store.getUserToken;

      axios
        .get(process.env.VUE_APP_URL + "/api/tahfidz/selections/latest/")
        .then(response => {
          this.periodId = response.data.latest_opened.id;
          localStorage.setItem("token", token);
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
        });
    }
  }
};
</script>

<style lang="scss" scoped>
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
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;

  .modal-overlay {
    width: inherit;
    height: inherit;
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
