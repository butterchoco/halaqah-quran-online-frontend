<template>
  <section class="program-registration-container">
    <div class="registration-form">
      <h2 class="header-title">Pendaftaran TahfidzQu Angkatan {{ getTimeline.generation }}</h2>
      <div class="form-group col">
        <label for="age-field">Usia</label>
        <input
          @change="checkField"
          required
          type="number"
          name="age-field"
          id="age-field"
          v-model="age"
          min="3"
          max="100"
          :class="{ error: isShowError && errors.ageError[0] }"
        />
        <p v-if="isShowError" class="error">{{ errors.ageError[0] }}</p>
      </div>
      <div class="form-group col">
        <label for="domicile-field">Domisili</label>
        <input
          @change="checkField"
          required
          type="text"
          name="domicile-field"
          id="domicile-field"
          v-model="domicile"
          :class="{ error: isShowError && errors.domicileError[0] }"
        />
        <p v-if="isShowError" class="error">{{ errors.domicileError[0] }}</p>
      </div>
      <div class="form-group col">
        <label for="juzNumberMemorized-field">Jumlah juz yang sudah dihafal</label>
        <input
          @change="checkField"
          required
          type="number"
          name="juzNumberMemorized-field"
          id="juzNumberMemorized-field"
          v-model="juzNumberMemorized"
          min="1"
          max="30"
          :class="{ error: isShowError && errors.juzNumberMemorizedError[0] }"
        />
        <p v-if="isShowError" class="error">{{ errors.juzNumberMemorizedError[0] }}</p>
      </div>
      <div class="form-group col">
        <label for="juzTargetNumber-field">Target juz yang ingin dihafal</label>
        <input
          @change="checkField"
          required
          type="number"
          name="juzTargetNumber-field"
          id="juzTargetNumber-field"
          v-model="juzTargetNumber"
          min="1"
          max="30"
          :class="{ error: isShowError && errors.juzTargetNumberError[0] }"
        />
        <p v-if="isShowError" class="error">{{ errors.juzTargetNumberError[0] }}</p>
      </div>
      <div class="row h-center">
        <div class="form-group col">
          <label for="hasTahsinExperience-field">Pengalaman Tahsin</label>
          <select
            name="hasTahsinExperience-field"
            id="hasTahsinExperience-field"
            @change="checkField"
            v-model="hasTahsinExperience"
            placeholder="Pilih Opsi"
            :class="{
              error: isShowError && errors.hasTahsinExperienceError[0]
            }"
          >
            <option disabled hidden value>Pilih Opsi</option>
            <option value="1">Ya, pernah</option>
            <option selected value="0">Tidak, belum Pernah</option>
          </select>
          <p v-if="isShowError" class="error">{{ errors.hasTahsinExperienceError[0] }}</p>
        </div>
        <div v-if="hasExperience()" class="form-group col optional">
          <label for="tahsinExperience-field">Kelompok/lembaga yang pernah diikuti</label>
          <label class="text-muted" for="tahsinExperience-field">Pisahkan dengan tanda baca koma ","</label>
          <input
            required
            type="text"
            name="tahsinExperience-field"
            @change="checkField"
            v-model="tahsinExperience"
            id="tahsinExperience-field"
            :class="{ error: isShowError && errors.tahsinExperienceError[0] }"
          />
          <p v-if="isShowError" class="error">{{ errors.tahsinExperienceError[0] }}</p>
        </div>
      </div>
      <div class="row h-center">
        <div class="form-group col optional">
          <label for="infaqOptionNumber-field">Pilihan Kontribusi Infaq</label>
          <select
            name="infaqOptionNumber-field"
            id="infaqOptionNumber-field"
            @change="checkField"
            v-model="infaqOptionNumber"
            placeholder="Pilih Opsi"
            :class="{ error: isShowError && errors.infaqOptionNumberError[0] }"
          >
            <option disabled hidden value>Pilih Opsi</option>
            <option selected value="1">Paket Sendiri (Rp.200.000)</option>
            <option value="2">Paket Berdua (Rp.240.000)</option>
            <option value="3">Paket Bertiga (Rp.280.000)</option>
          </select>
          <p v-if="isShowError" class="error">{{ errors.infaqOptionNumberError[0] }}</p>
        </div>
        <div v-if="isInfaqTogether" class="form-group col optional">
          <label for="infaqChoice-field">Sahabat kontribusi</label>
          <label class="text-muted" for="infaqChoice-field">Pisahkan dengan tanda baca koma ","</label>
          <input
            @change="checkField"
            required
            type="text"
            name="infaqChoice-field"
            v-model="infaqChoice"
            id="infaqChoice-field"
            :class="{ error: isShowError && errors.infaqChoiceError[0] }"
          />
          <p v-if="isShowError" class="error">{{ errors.infaqChoiceError[0] }}</p>
        </div>
      </div>
      <div class="form-group col">
        <label for="recording-field">Upload Rekaman Bacaan</label>
        <label class="text-muted" for="recording-field">
          Format file: Namamu_TahfidzQu {{ getTimeline.generation }}
          <br />(".aac", ".mpeg", ".ogg", ".x-wav", ".webm", ".3gpp", ".wav",
          ".m4a")
        </label>
        <input
          required
          type="file"
          name="recording-field"
          id="recording-field"
          ref="recordingField"
          min="1"
          max="30"
          @change="onFileChange"
          :class="{ error: isShowError && errors.recordingError[0] }"
        />
        <p v-if="isShowError" class="error">{{ errors.recordingError[0] }}</p>
      </div>
      <div class="form-group col">
        <label for="motivation-field">Ceritakan motivasimu mengikuti program ini!</label>
        <textarea
          @change="checkField"
          required
          id="motivation-field"
          rows="4"
          cols="50"
          v-model="motivation"
          :class="{ error: isShowError && errors.motivationError[0] }"
        />
        <p v-if="isShowError" class="error">{{ errors.motivationError[0] }}</p>
      </div>
      <div class="form-group col">
        <label>Darimana kamu mendapatkan informasi program ini ?</label>
        <p v-if="isShowError" class="error">{{ errors.programInfoReferenceError[0] }}</p>
        <div class="checkbox">
          <label for="line-field">Line</label>
          <span class="check">
            <svg
              v-if="programInfoReference.line"
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 9.5L6.5 16L17 1"
                stroke="#1B262C"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <input
            @change="checkField"
            required
            hidden
            type="checkbox"
            name="line-field"
            id="line-field"
            ref="lineField"
            min="1"
            max="30"
            v-model="programInfoReference.line"
          />
        </div>
        <div class="checkbox">
          <label for="whatsapp-field">Whatsapp</label>
          <span class="check">
            <svg
              v-if="programInfoReference.whatsapp"
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 9.5L6.5 16L17 1"
                stroke="#1B262C"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <input
            @change="checkField"
            required
            hidden
            type="checkbox"
            name="whatsapp-field"
            id="whatsapp-field"
            ref="whatsappField"
            min="1"
            max="30"
            v-model="programInfoReference.whatsapp"
          />
        </div>
        <div class="checkbox">
          <label for="instagram-field">Instagram</label>
          <span class="check">
            <svg
              v-if="programInfoReference.instagram"
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 9.5L6.5 16L17 1"
                stroke="#1B262C"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <input
            @change="checkField"
            required
            hidden
            type="checkbox"
            name="instagram-field"
            id="instagram-field"
            ref="instagramField"
            min="1"
            max="30"
            v-model="programInfoReference.instagram"
          />
        </div>
        <div class="checkbox">
          <label for="facebook-field">Facebook</label>
          <span class="check">
            <svg
              v-if="programInfoReference.facebook"
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 9.5L6.5 16L17 1"
                stroke="#1B262C"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <input
            @change="checkField"
            required
            hidden
            type="checkbox"
            name="facebook-field"
            id="facebook-field"
            ref="facebookField"
            min="1"
            max="30"
            v-model="programInfoReference.facebook"
          />
        </div>
      </div>
      <div class="form-group tnc">
        <div class="checkbox">
          <label class="TermAndConditions1" for="TermAndConditions1-field">
            Saya bersedia meluangkan waktu untuk setoran secara langsung
            (malalui whatsapp call) ke ustadz/ah sepekan minimal sekali dan
            ujian muroja'ah sepekan sekali
          </label>
          <span class="check">
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              v-if="isTnC1Check"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 9.5L6.5 16L17 1"
                stroke="#1B262C"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <input
            @change="checkField"
            required
            hidden
            type="checkbox"
            name="TermAndConditions1-field"
            id="TermAndConditions1-field"
            ref="TermAndConditions1Field"
            min="1"
            max="30"
            v-model="isTnC1Check"
          />
        </div>
      </div>
      <div class="form-group tnc">
        <div class="checkbox">
          <label class="TermAndConditions2" for="TermAndConditions2-field">
            Saya berusaha sebaik mungkin menjaga adab halaqah Quran, misal
            dengan aktif di grup, memberikan kabar jika berhalangan setoran dan
            menaati peraturan.
          </label>
          <span class="check">
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              v-if="isTnC2Check"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 9.5L6.5 16L17 1"
                stroke="#1B262C"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <input
            @change="checkField"
            required
            hidden
            type="checkbox"
            name="TermAndConditions2-field"
            id="TermAndConditions2-field"
            ref="TermAndConditions2Field"
            min="1"
            max="30"
            v-model="isTnC2Check"
          />
        </div>
      </div>
      <p v-if="isShowError" class="error">{{ this.errors.TermAndConditionsError[0] }}</p>
      <button class="register btn primary" @click="submit">Daftar</button>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import axios from "axios";

export default {
  name: "ProgramRegistration",
  components: {},
  data() {
    return {
      displayError: "",
      errors: {
        ageError: [],
        domicileError: [],
        recordingError: [],
        juzTargetNumberError: [],
        juzNumberMemorizedError: [],
        hasTahsinExperienceError: [],
        tahsinExperienceError: [],
        infaqOptionNumberError: [],
        infaqChoiceError: [],
        programInfoReferenceError: [],
        motivationError: [],
        TermAndConditionsError: []
      },
      isShowError: false,
      userId: "",
      term: "",
      age: "",
      domicile: "",
      recording: "",
      juzTargetNumber: "",
      juzNumberMemorized: "",
      hasTahsinExperience: "",
      tahsinExperience: "",
      isInfaqTogether: false,
      infaqOptionNumber: "",
      infaqChoice: [],
      programInfoReference: {
        line: false,
        whatsapp: false,
        intagram: false,
        facebook: false
      },
      motivation: "",
      isTnC1Check: false,
      isTnC2Check: false,
      canSubmit: false
    };
  },
  created() {
    this.checkField();
  },
  methods: {
    hideError() {
      this.isShowError = false;
    },
    showError() {
      this.isShowError = true;
    },
    removeElementInArray(arr, value) {
      const index = arr.indexOf(value);
      if (index > -1) {
        arr.splice(index, 1);
      }
    },
    hasExperience() {
      if (this.hasTahsinExperience == "1") {
        return true;
      } else {
        return false;
      }
    },
    onFileChange() {
      const files = this.$refs.recordingField.files;
      if (!files.length) {
        return;
      }
      const expectedExtensionFiles = [
        "aac",
        "mpeg",
        "ogg",
        "x-wav",
        "webm",
        "3gpp",
        "wav",
        "m4a"
      ];
      const extensionFiles = files[0].name.split(".")[1];
      const formatMessageError = "File harus mempunyai format yang sesuai !";
      const recordingFieldNotFilled =
        "Upload rekaman bacaan anda terlebih dahulu !";
      if (expectedExtensionFiles.includes(extensionFiles)) {
        if (this.errors.recordingError.includes(formatMessageError)) {
          this.removeElementInArray(
            this.errors.recordingError,
            formatMessageError
          );
        }
        if (this.errors.recordingError.includes(recordingFieldNotFilled)) {
          this.removeElementInArray(
            this.errors.recordingError,
            recordingFieldNotFilled
          );
        }
      } else {
        if (!this.errors.recordingError.includes(formatMessageError)) {
          this.errors.recordingError.unshift(formatMessageError);
        }
        return;
      }
      this.recording = files[0];
    },
    checkInfaqOptionField() {
      const infaqOptionError = "Isian 'Pilihan Kontribusi Infaq' harus dipilih";

      if (this.infaqOptionNumber == "2" || this.infaqOptionNumber == "3") {
        this.isInfaqTogether = true;
      } else {
        this.isInfaqTogether = false;
      }

      if (this.infaqOptionNumber != "") {
        if (this.errors.infaqOptionNumberError.includes(infaqOptionError)) {
          this.removeElementInArray(
            this.errors.infaqOptionNumberError,
            infaqOptionError
          );
        }

        if (this.infaqOptionNumber == "2" || this.infaqOptionNumber == "3") {
          const infaqChoiceFieldNotFilled =
            "Isian 'Sahabat Kontribusi' harus dipilih";
          if (this.infaqChoice != "") {
            if (
              this.errors.infaqChoiceError.includes(infaqChoiceFieldNotFilled)
            ) {
              this.removeElementInArray(
                this.errors.infaqChoiceError,
                infaqChoiceFieldNotFilled
              );
            }

            const friendsMaximumExceededError =
              "Sahabat Kontribusi melebihi kapasitas paket yang dipilih !";
            const infaqChoiceNotExpected =
              "Sahabat Kontribusi harus diisi sesuai paket !";
            if (
              this.infaqChoice.split(",").length >
              Number(this.infaqOptionNumber) - 1
            ) {
              if (
                !this.errors.infaqChoiceError.includes(
                  friendsMaximumExceededError
                )
              ) {
                this.errors.infaqChoiceError.unshift(
                  friendsMaximumExceededError
                );
              }
            } else if (
              this.infaqChoice.split(",").length <
              Number(this.infaqOptionNumber) - 1
            ) {
              if (
                !this.errors.infaqChoiceError.includes(infaqChoiceNotExpected)
              ) {
                this.errors.infaqChoiceError.unshift(infaqChoiceNotExpected);
              }
            } else {
              if (
                this.errors.infaqChoiceError.includes(
                  friendsMaximumExceededError
                )
              ) {
                this.removeElementInArray(
                  this.errors.infaqChoiceError,
                  friendsMaximumExceededError
                );
              } else if (
                this.errors.infaqChoiceError.includes(infaqChoiceNotExpected)
              ) {
                this.removeElementInArray(
                  this.errors.infaqChoiceError,
                  infaqChoiceNotExpected
                );
              }
            }
          } else {
            if (
              !this.errors.infaqChoiceError.includes(infaqChoiceFieldNotFilled)
            ) {
              this.errors.infaqChoiceError.unshift(infaqChoiceFieldNotFilled);
            }
          }
        }
      } else {
        if (!this.errors.infaqOptionNumberError.includes(infaqOptionError)) {
          this.errors.infaqOptionNumberError.unshift(infaqOptionError);
        }
      }
    },
    checkTahsinExperienceField() {
      const hasTahsinExpFieldNotFilled =
        "Isian 'Pengalaman Tahsin' harus dipilih !";

      if (this.hasTahsinExperience != "") {
        if (
          this.errors.hasTahsinExperienceError.includes(
            hasTahsinExpFieldNotFilled
          )
        ) {
          this.removeElementInArray(
            this.errors.hasTahsinExperienceError,
            hasTahsinExpFieldNotFilled
          );
        }

        if (this.hasTahsinExperience == "1") {
          const tahsinExperienceFieldNotFilled =
            "Isian 'Kelompok/lembaga yang pernah diikuti' harus diisi !";
          if (this.tahsinExperience != "") {
            if (
              this.errors.tahsinExperienceError.includes(
                tahsinExperienceFieldNotFilled
              )
            ) {
              this.removeElementInArray(
                this.errors.tahsinExperienceError,
                tahsinExperienceFieldNotFilled
              );
            }
          } else {
            if (
              !this.errors.tahsinExperienceError.includes(
                tahsinExperienceFieldNotFilled
              )
            ) {
              this.errors.tahsinExperienceError.unshift(
                tahsinExperienceFieldNotFilled
              );
            }
          }
        }
      } else {
        if (
          !this.errors.hasTahsinExperienceError.includes(
            hasTahsinExpFieldNotFilled
          )
        ) {
          this.errors.hasTahsinExperienceError.unshift(
            hasTahsinExpFieldNotFilled
          );
        }
      }
    },
    checkJuzTargetNumber() {
      const juzTargetFieldNotFilled =
        "Isian 'Target juz yang ingin dihafal' harus diisi lengkap !";
      if (this.juzTargetNumber != "") {
        if (
          this.errors.juzTargetNumberError.includes(juzTargetFieldNotFilled)
        ) {
          this.removeElementInArray(
            this.errors.juzTargetNumberError,
            juzTargetFieldNotFilled
          );
        }
      } else {
        if (
          !this.errors.juzTargetNumberError.includes(juzTargetFieldNotFilled)
        ) {
          this.errors.juzTargetNumberError.unshift(juzTargetFieldNotFilled);
        }
      }
    },
    checkAgeField() {
      const ageFieldNotFilled = "Isian 'Usia' harus diisi lengkap !";
      if (this.age != "") {
        if (this.errors.ageError.includes(ageFieldNotFilled)) {
          this.removeElementInArray(this.errors.ageError, ageFieldNotFilled);
        }
      } else {
        if (!this.errors.ageError.includes(ageFieldNotFilled)) {
          this.errors.ageError.unshift(ageFieldNotFilled);
        }
      }
    },
    checkDomicileField() {
      const domicileFieldNotFilled = "Isian 'Domisili' harus diisi lengkap !";
      if (this.domicile != "") {
        if (this.errors.domicileError.includes(domicileFieldNotFilled)) {
          this.removeElementInArray(
            this.errors.domicileError,
            domicileFieldNotFilled
          );
        }
      } else {
        if (!this.errors.domicileError.includes(domicileFieldNotFilled)) {
          this.errors.domicileError.unshift(domicileFieldNotFilled);
        }
      }
    },
    checkJuzNumberMemorizedField() {
      const juzMemorizedFieldNotFilled =
        "Isian 'Jumlah juz yang sudah dihafal' harus diisi lengkap !";
      if (this.juzNumberMemorized != "") {
        if (
          this.errors.juzNumberMemorizedError.includes(
            juzMemorizedFieldNotFilled
          )
        ) {
          this.removeElementInArray(
            this.errors.juzNumberMemorizedError,
            juzMemorizedFieldNotFilled
          );
        }
      } else {
        if (
          !this.errors.juzNumberMemorizedError.includes(
            juzMemorizedFieldNotFilled
          )
        ) {
          this.errors.juzNumberMemorizedError.unshift(
            juzMemorizedFieldNotFilled
          );
        }
      }
    },
    checkRecordingField() {
      const recordingFieldNotFilled =
        "Upload rekaman bacaan anda terlebih dahulu !";

      if (this.recording != "") {
        if (this.errors.recordingError.includes(recordingFieldNotFilled)) {
          this.removeElementInArray(
            this.errors.recordingError,
            recordingFieldNotFilled
          );
        }
      } else {
        if (!this.errors.recordingError.includes(recordingFieldNotFilled)) {
          this.errors.recordingError.unshift(recordingFieldNotFilled);
        }
      }
    },
    checkMotivationField() {
      const motivationFieldNotFilled = "Isian 'motivasi' harus diisi lengkap !";
      if (this.motivation != "") {
        if (this.errors.motivationError.includes(motivationFieldNotFilled)) {
          this.removeElementInArray(
            this.errors.motivationError,
            motivationFieldNotFilled
          );
        }
      } else {
        if (!this.errors.motivationError.includes(motivationFieldNotFilled)) {
          this.errors.motivationError.unshift(motivationFieldNotFilled);
        }
      }
    },
    checkTnCField() {
      const tncNotChecked =
        "Ceklis Persetujuan dan Ketentuan terlebih dahulu !";
      if (this.isTnC1Check == true && this.isTnC2Check == true) {
        if (this.errors.TermAndConditionsError.includes(tncNotChecked)) {
          this.removeElementInArray(
            this.errors.TermAndConditionsError,
            tncNotChecked
          );
        }
      } else {
        if (!this.errors.TermAndConditionsError.includes(tncNotChecked)) {
          this.errors.TermAndConditionsError.unshift(tncNotChecked);
        }
      }
    },
    checkInformationReferenceField() {
      const programInfoReferenceFieldNotFilled =
        "Isian 'Darimana mendapatkan informasi program ini' harus diisi lengkap !";
      if (
        this.programInfoReference.line != "" ||
        this.programInfoReference.whatsapp != "" ||
        this.programInfoReference.intagram != "" ||
        this.programInfoReference.facebook != ""
      ) {
        if (
          this.errors.programInfoReferenceError.includes(
            programInfoReferenceFieldNotFilled
          )
        ) {
          this.removeElementInArray(
            this.errors.programInfoReferenceError,
            programInfoReferenceFieldNotFilled
          );
        }
      } else {
        if (
          !this.errors.programInfoReferenceError.includes(
            programInfoReferenceFieldNotFilled
          )
        ) {
          this.errors.programInfoReferenceError.unshift(
            programInfoReferenceFieldNotFilled
          );
        }
      }
    },
    checkField() {
      this.checkAgeField();

      this.checkDomicileField();

      this.checkJuzNumberMemorizedField();

      this.checkJuzTargetNumber();

      this.checkTahsinExperienceField();

      this.checkInfaqOptionField();

      this.checkRecordingField();

      this.checkMotivationField();

      this.checkInformationReferenceField();

      this.checkTnCField();
    },
    hasError() {
      let key;
      for (key in this.errors) {
        if (this.errors[key].length != 0) {
          return true;
        }
      }
      return false;
    },
    submit() {
      if (this.hasError()) {
        this.showError();
        return;
      }
      const year = new Date().getFullYear();

      axios.get(process.env.VUE_APP_URL + "/api/tahfidz/selections/latest/").then(response => {
        this.periodId = response.data.latest_opened.id;
        this.term = "TahfidzQu_" + year + "_" + this.periodId;
        axios
          .post(process.env.VUE_APP_URL + "/api/tahfidz/selections/" + this.periodId, {
            'term': this.term,
            'user': 12,
            'age': this.age,
            'domicile': this.domicile,
            'recording': this.recording,
            'juz_target_number': this.juzTargetNumber,
            'juz_number_memorized': this.juzNumberMemorized,
            'tahsin_experience': this.tahsinExperience,
            'pilihan_infaq': this.infaqOptionNumber,
            'selection_period': this.periodId,
            'referral_names': this.infaqChoice
          })
          .then(response => {
            this.$store.commit("setHasProgramRegistered", {
              value: response.data["has_registered"]
            });
          });
      });
    }
  },
  computed: {
    ...mapGetters(["getTimeline"]),
    ...mapMutations(["setHasProgramRegistered"])
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/programRegistrationForm.scss";
</style>
