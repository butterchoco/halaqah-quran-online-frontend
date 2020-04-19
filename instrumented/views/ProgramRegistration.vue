<template>
  <section class="vector-background">
    <b-container class="form-container py-5">
      <h2 class="header-title">Pendaftaran TahfidzQu Angkatan {{ getTimeline.generation }}</h2>
      <b-form @submit.stop.prevent="onSubmit">
        <b-row align-v="start">
          <b-col sm="12">
            <b-form-checkbox-group
              id="TermAndConditions"
              class="my-4"
              v-model="form.TermAndConditions"
              name="TermAndConditions"
              :options="form.TermAndConditionsOptions"
              :state="validateState('TermAndConditions')"
              aria-describedby="TermAndConditions-live-feedback"
              value-field="item"
              text-field="name"
            ></b-form-checkbox-group>
          </b-col>
        </b-row>

        <b-row align-v="start">
          <b-col sm="12" md="6" lg="5">
            <b-form-group id="age-group" label="Umur" label-for="age">
              <b-form-input
                id="age"
                size="sm"
                type="number"
                v-model="form.age"
                placeholder="Masukkan umur . . . contoh : 12"
                :state="validateState('age')"
                aria-describedby="age-live-feedback"
                @change="touchForm('age')"
              ></b-form-input>
              <b-form-invalid-feedback
                id="age-live-feedback"
                class="error_age"
              >Masukkan umur dengan benar</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row align-v="start">
          <b-col sm="12" md="6" lg="5">
            <b-form-group id="domicile-group" label="Domisili" label-for="domicile">
              <b-form-input
                id="domicile"
                size="sm"
                v-model="form.domicile"
                :state="validateState('domicile')"
                placeholder="Masukkan domisili . . . contoh : Depok"
                aria-describedby="domicile-live-feedback"
                @change="touchForm('domicile')"
              ></b-form-input>
              <b-form-invalid-feedback
                id="domicile-live-feedback"
                class="error_domicile"
              >Masukkan domisili dengan benar</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row align-v="start">
          <b-col sm="12" md="6" lg="5">
            <b-form-group
              id="juzNumberMemorized-group"
              label="Jumlah Juz yang dihafal"
              label-for="juzNumberMemorized"
            >
              <b-form-input
                id="juzNumberMemorized"
                type="number"
                size="sm"
                placeholder="Masukkan jumlah juz . . . contoh : 12"
                v-model="form.juzNumberMemorized"
                :state="validateState('juzNumberMemorized')"
                aria-describedby="juzNumberMemorized-live-feedback"
                @change="touchForm('juzNumberMemorized')"
              ></b-form-input>
              <b-form-invalid-feedback
                id="juzNumberMemorized-live-feedback"
                class="error_juzNumberMemorized"
              >Masukkan jumlah dengan benar</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row align-v="start">
          <b-col sm="12" md="6" lg="5">
            <b-form-group
              id="juzTargetNumber-group"
              label="Target juz yang ingin dihafal"
              label-for="juzTargetNumber"
            >
              <b-form-input
                id="juzTargetNumber"
                type="number"
                size="sm"
                v-model="form.juzTargetNumber"
                placeholder="Masukkan jumlah juz . . . contoh : 18"
                :state="validateState('juzTargetNumber')"
                aria-describedby="juzTargetNumber-live-feedback"
                @change="touchForm('juzTargetNumber')"
              ></b-form-input>
              <b-form-invalid-feedback
                id="juzTargetNumber-live-feedback"
                class="error_juzTargetNumber"
              >Masukkan jumlah dengan benar</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row align-v="start">
          <b-col sm="12" md="6">
            <b-form-group
              id="hasTahsinExperience-group"
              label="Pengalaman Tahsin"
              label-for="hasTahsinExperience"
            >
              <b-form-select
                id="hasTahsinExperience"
                v-model="form.hasTahsinExperience"
                :options="form.hasTahsinExperienceOption"
                placeholder="Masukkan umur . . . contoh : 12"
                :state="validateState('hasTahsinExperience')"
                aria-describedby="hasTahsinExperience-live-feedback"
                @change="touchForm('hasTahsinExperience')"
              >
                <template v-slot:first>
                  <b-form-select-option :value="null" disabled>Pilih Opsi</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col sm="12" md="6" v-if="form.hasTahsinExperience == 1">
            <b-form-group
              id="tahsinExperience-group"
              label="Belajar di mana ?"
              label-for="tahsinExperience"
            >
              <b-form-input
                id="tahsinExperience"
                size="sm"
                placeholder="Kelompok/lembaga yang pernah diikuti"
                v-model="form.tahsinExperience"
                :state="validateState('tahsinExperience')"
                aria-describedby="tahsinExperience-live-feedback"
                @change="touchForm('tahsinExperience')"
              ></b-form-input>
              <b-form-invalid-feedback
                id="tahsinExperience-live-feedback"
                class="error_tahsinExperience"
              >Masukkan kelompok dengan benar</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row align-v="start">
          <b-col sm="12" md="6">
            <b-form-group
              id="infaqOptionNumber-group"
              label="Pilihan Kontribusi Infaq"
              label-for="infaqOptionNumber"
            >
              <b-form-select
                id="infaqOptionNumber"
                v-model="form.infaqOptionNumber"
                :options="form.infaqOptionNumberOption"
                :state="validateState('infaqOptionNumber')"
                aria-describedby="infaqOptionNumber-live-feedback"
                @change="touchForm('infaqOptionNumber')"
              >
                <template v-slot:first>
                  <b-form-select-option :value="null" disabled>Pilih Opsi</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col sm="12" md="6" v-if="form.infaqOptionNumber === 2 || form.infaqOptionNumber === 3">
            <b-form-group
              id="referralName1-group"
              v-if="form.infaqOptionNumber === 2 || form.infaqOptionNumber === 3"
              label="Sahabat kontribusi 1"
              label-for="referralName1"
            >
              <b-form-input
                id="referralName1"
                size="sm"
                placeholder="Masukkan username teman kamu di sini"
                v-model="form.referralName1"
                :state="validateState('referralName1')"
                aria-describedby="referralName1-live-feedback"
                @change="touchForm('referralName1')"
              ></b-form-input>
              <b-form-invalid-feedback
                id="referralName1-live-feedback"
                class="error_referralName1"
              >Masukkan sahabat kontribusi 1 dengan benar</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
              id="referralName2-group"
              v-if="form.infaqOptionNumber === 3"
              label="Sahabat kontribusi 2"
              label-for="referralName2"
            >
              <b-form-input
                id="referralName2"
                size="sm"
                placeholder="Masukkan username teman kamu di sini"
                v-model="form.referralName2"
                :state="validateState('referralName2')"
                aria-describedby="referralName2-live-feedback"
                @change="touchForm('referralName2')"
              ></b-form-input>
              <b-form-invalid-feedback
                id="referralName2-live-feedback"
                class="error_referralName2"
              >Masukkan sahabat kontribusi 2 dengan benar</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row align-v="start">
          <b-col sm="12" md="6" lg="5">
            <b-form-group
              class="form-group"
              id="recording-group"
              label="Upload Rekaman Bacaan"
              description="Format file: Namamu_TahfidzQu_Angkatan ('.aac', '.mpeg', '.ogg', '.x-wav', '.webm', '.3gpp', '.wav',
          '.m4a', '.mp3')"
              label-for="recording"
            >
              <b-form-file
                id="recording"
                size="sm"
                ref="recording"
                v-model="form.recording"
                :state="validateRecording"
                aria-describedby="recording-live-feedback"
              ></b-form-file>
              <b-form-invalid-feedback
                id="recording-live-feedback"
                class="error_recording"
              >Upload file rekaman bacaan dengan benar</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row align-v="start">
          <b-col sm="12" md="6" lg="6">
            <b-form-group
              id="motivation-group"
              label="Ceritakan motivasimu mengikuti program ini!"
              label-for="motivation"
            >
              <b-form-textarea
                id="motivation"
                v-model="form.motivation"
                placeholder="Masukkan motivasi kamu di sini..."
                :state="validateState('motivation')"
                aria-describedby="motivation-live-feedback"
                rows="3"
                max-rows="4"
              ></b-form-textarea>
              <b-form-invalid-feedback
                id="motivation-live-feedback"
                class="error_motivation"
              >Masukkan motivasi kamu mengikuti program ini</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row align-v="start">
          <b-col sm="12">
            <b-form-group
              id="programInfoReference-group"
              class="mt-4"
              label="Darimana kamu mendapatkan informasi program ini ?"
              label-for="programInfoReference"
            >
              <b-form-checkbox-group
                id="programInfoReference"
                v-model="form.programInfoReference"
                name="programInfoReference"
                button-variant="primary"
                :options="form.programInfoReferenceOptions"
                value-field="item"
                text-field="name"
                :state="validateState('programInfoReference')"
                aria-describedby="programInfoReference-live-feedback"
              ></b-form-checkbox-group>
              <b-form-invalid-feedback
                id="programInfoReference-live-feedback"
                class="error_programInfoReference"
              >Masukkan platform darimana info berasal</b-form-invalid-feedback>

              <b-col cols="6">
                <b-form-input
                  id="programInfoReferenceAdditional"
                  size="sm"
                  class="mt-2"
                  placeholder="Pisahkan dengan koma jika lebih dari satu platform . . ."
                  v-if="form.programInfoReference.includes('Other')"
                  v-model="form.programInfoReferenceAdditional"
                  :state="validateState('programInfoReferenceAdditional')"
                  aria-describedby="programInfoReferenceAdditional-live-feedback"
                  @change="touchForm('programInfoReferenceAdditional')"
                ></b-form-input>
                <b-form-invalid-feedback
                  id="programInfoReferenceAdditional-live-feedback"
                  class="error_programInfoReferenceAdditional"
                >Masukkan platform darimana info berasal</b-form-invalid-feedback>
              </b-col>
            </b-form-group>
          </b-col>
        </b-row>
        <b-button
          id="submit"
          type="submit"
          size="sm"
          ref="btn-submit"
          variant="none"
          class="primary mt-4"
          @click="$v.$reset"
        >Daftar</b-button>
      </b-form>
    </b-container>
    <div v-if="isLoading" id="cover-spin"></div>
  </section>
</template>

<script>
import {
  required,
  requiredIf,
  minLength,
  maxLength,
  numeric
} from "vuelidate/lib/validators";

import { mapGetters } from "vuex";
import router from "@/router";
import User from "@/services/User";

export default {
  name: "ProgramRegistration",
  components: {},
  data() {
    return {
      isLoading: false,
      form: {
        age: "",
        domicile: "",
        recording: null,
        juzTargetNumber: "",
        juzNumberMemorized: "",
        hasTahsinExperience: "",
        hasTahsinExperienceOption: [
          { value: 1, text: "Ya, pernah" },
          { value: 0, text: "Tidak, belum pernah" }
        ],
        tahsinExperience: "",
        infaqOptionNumber: "",
        infaqOptionNumberOption: [
          { value: 1, text: "Paket Sendiri (Rp.200.000)" },
          { value: 2, text: "Paket Berdua (Rp.240.000)" },
          { value: 3, text: "Paket Bertiga (Rp.280.000)" }
        ],
        referralName1: "",
        referralName2: "",
        programInfoReference: [],
        programInfoReferenceOptions: [
          { item: "Line", name: "Line" },
          { item: "Instagram", name: "Instagram" },
          { item: "Whatsapp", name: "Whatsapp" },
          { item: "Facebook", name: "Facebook" },
          { item: "Other", name: "Others" }
        ],
        TermAndConditions: [],
        TermAndConditionsOptions: [
          {
            item: "tnc1",
            name:
              "Saya bersedia meluangkan waktu untuk setoran secara langsung(malalui whatsapp call) ke ustadz/ah sepekan minimal sekali dan ujian muroja'ah sepekan sekali"
          },
          {
            item: "tnc2",
            name:
              "Saya berusaha sebaik mungkin menjaga adab halaqah Quran, misal dengan aktif di grup, memberikan kabar jika berhalangan setoran dan menaati peraturan."
          }
        ]
      },
      pathTo: {
        0: "/login-forbidden",
        1: "/regis-success",
        2: "/regis-success",
        3: "/forbidden",
        4: "/forbidden"
      }
    };
  },
  validations: {
    form: {
      age: {
        required,
        numeric,
        minLength: minLength(1),
        maxLength: maxLength(100)
      },
      domicile: {
        required,
        minLength: minLength(1)
      },
      juzTargetNumber: {
        required,
        numeric,
        minLength: minLength(1),
        maxLength: maxLength(30)
      },
      juzNumberMemorized: {
        required,
        numeric,
        minLength: minLength(1),
        maxLength: maxLength(30)
      },
      hasTahsinExperience: {
        required
      },
      tahsinExperience: {
        required
      },
      infaqOptionNumber: {
        required
      },
      referralName1: {
        required
      },
      referralName2: {
        required
      },
      motivation: {
        required
      },
      programInfoReference: {
        required
      },
      programInfoReferenceAdditional: {
        requiredIf: requiredIf("programInfoReference".includes("Other"))
      },
      TermAndConditions: {
        required,
        minLength: minLength(2)
      }
    }
  },
  created() {
    if (!this.getRegistrationPeriodOpened) {
      this.routerPushTo("/regis-closed");
    }
    if (this.getHasProgramRegistered) {
      this.routerPushTo("/regis-success");
    }
    if (
      this.pathTo[this.getUserRole[this.getUserRole.length - 1].role_id] !==
      undefined
    ) {
      this.routerPushTo(
        this.pathTo[this.getUserRole[this.getUserRole.length - 1].role_id]
      );
    }
  },
  methods: {
    routerPushTo(path) {
      router.push(path);
    },
    touchForm() {
      const name = [
        "age",
        "domicile",
        "juzTargetNumber",
        "juzNumberMemorized",
        "hasTahsinExperience",
        "infaqOptionNumber",
        "tahsinExperience",
        "referralName1",
        "referralName2",
        "motivation",
        "programInfoReferenceAdditional",
        "TermAndConditions"
      ];
      if (this.form.hasTahsinExperience === 0) {
        if (this.form.infaqOptionNumber === 1) {
          name.splice(name.indexOf("referralName1"), 1);
          name.splice(name.indexOf("referralName2"), 1);
        } else if (this.form.infaqOptionNumber === 2) {
          name.splice(name.indexOf("referralName2"), 1);
        }
        name.splice(name.indexOf("tahsinExperience"), 1);
      } else if (this.form.infaqOptionNumber === 1) {
        name.splice(name.indexOf("referralName1"), 1);
        name.splice(name.indexOf("referralName2"), 1);
      } else if (this.form.infaqOptionNumber === 2) {
        name.splice(name.indexOf("referralName2"), 1);
      }
      for (let i = 0; i < name.length; i++) {
        this.$v.form[name[i]].$touch();
      }
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    onSubmit() {
      this.touchForm();
      if (this.$v.form.$anyError) {
        return;
      } else {
        this.isLoading = true;
        this.postForm();
      }
    },
    postForm() {
      User.sendProgramRegistrationForm(
        process.env.VUE_APP_URL,
        this.getAccessToken,
        this.getPeriodId,
        this.form
      )
        .then(() => {
          this.routerPushTo("/regis-success");
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  },
  computed: {
    ...mapGetters({
      getTimeline: "getTimeline",
      getAccessToken: "getAccessToken",
      getRegistrationPeriodOpened: "getRegistrationPeriodOpened",
      getUserId: "getUserId",
      getUserRole: "getUserRole",
      getPeriodId: "getPeriodId",
      getTermName: "getTermName",
      getHasProgramRegistered: "getHasProgramRegistered"
    }),
    validateRecording() {
      const files = this.form.recording;
      if (files == null) return false;
      const expectedExtensionFiles = [
        "aac",
        "mpeg",
        "ogg",
        "x-wav",
        "webm",
        "3gpp",
        "wav",
        "m4a",
        "mp3"
      ];
      const extensionFiles = files.name.split(".")[1];
      if (expectedExtensionFiles.includes(extensionFiles)) return true;
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/form.scss";

form {
  margin-top: 2rem;
}

.form-container {
  padding: 0 10%;
}

@media only screen and (max-width: 768px) {
  .form-container {
    padding: 0 5%;
  }
}
</style>
