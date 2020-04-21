<template>
  <div class="pengumuman-container col center">
    <section class="pengumuman-container vector-background col center">
      <div class="message-container col center">
        <div v-if="isPaymentAccepted && isUploaded">
          <b-row>
            <b-col md="6" offset-md="3">
              <div class="justify-content-md-center">
                <img src="@/assets/img/verified-success.png" alt="menunggu verifikasi" />
              </div>
            </b-col>
          </b-row>
          <h1 class="header-title">Pembayaran terverifikasi!</h1>
          <b-row>
            <b-col md="10" offset-md="3">
              <p>Silahkan join grup whatsapp dengan link di bawah.</p>
              <br />
              <a :href="whatsappLink">
                <b-button variant="none" class="primary">{{whatsappLink}}</b-button>
              </a>
            </b-col>
          </b-row>
        </div>

        <div v-if="isUploaded && isPaymentAccepted === null">
          <img class="mx-auto" src="@/assets/img/menunggu-verifikasi.png" alt="menunggu verifikasi" />
          <h1>Tunggu beberapa saat...</h1>
          <br />
          <p>Proses verifikasi akan berlangsung selama 1x24 jam.</p>
          <br />........
        </div>
        <div v-if="!isUploaded || isUploaded && isPaymentAccepted === false">
          <div v-if="isPaymentAccepted === false" class="rejected">
            <b-alert show variant="danger">Bukti pembayaran ditolak. Tolong upload bukti yang valid.</b-alert>
          </div>
          <h3 class="header-title black">Pembayaran Infaq</h3>
          <p>Jumlah yang harus dibayar:</p>
          <p class="header-title black">
            Rp.
            <span ref="nominal">{{nominal}}</span>
          </p>
          <a @click="copyText('nominal')" id="salin-jumlah">
            <small>Salin jumlah</small>
          </a>
          <p>Transfer ke rekening berikut:</p>
          <p>
            <span ref="norek">12080921</span> a.n. Qaaf
          </p>
          <a @click="copyText('norek')" ref="salin-norek">
            <small>Salin no. rekening</small>
          </a>
          <br />
          <b-form @submit.stop.prevent="onSubmit">
            <b-row align-v="start">
              <b-col sm="12">
                <b-form-group
                  class="form-group"
                  id="transaction-group"
                  label="Upload Bukti Pembayaran"
                  description="Format file: ('.jpg', '.png')"
                  label-for="transaction"
                >
                  <b-form-file
                    id="transaction"
                    size="sm"
                    ref="transaction"
                    v-model="form.transactionImg"
                    :state="validateTransaction"
                    aria-describedby="transaction-live-feedback"
                  ></b-form-file>
                  <b-form-invalid-feedback
                    id="transaction-live-feedback"
                    class="error_transaction"
                  >Pastikan format file sudah benar</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
            <br />
            <b-button
              id="submit"
              type="submit"
              size="sm"
              ref="btn-submit"
              variant="none"
              :state="validateTransaction"
              class="primary mt-4"
            >Selesaikan</b-button>
          </b-form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import router from "@/router";
import User from "@/services/User";
import { required } from "vuelidate/lib/validators";
export default {
  name: "Transaction",
  data() {
    return {
      nominal: "",
      form: {
        transactionImg: null
      },
      isPaymentAccepted: null,
      isUploaded: false,
      whatsappLink: null
    };
  },
  validations: {
    form: {
      transactionImg: {
        required
      }
    }
  },
  mounted() {
    if (this.getUserRole[this.getUserRole.length - 1].role_id == 0) {
      this.gotoLoginForbidden();
    } else if (this.getUserRole[this.getUserRole.length - 1].role_id != 2) {
      this.gotoForbiddenPage();
    } else if (!this.getPaymentPeriodOpened) {
      this.gotoPeriodForbidden();
    } else {
      this.getDataPembayaran();
    }
  },
  methods: {
    gotoForbiddenPage() {
      router.push("/forbidden/role");
    },
    gotoLoginForbidden() {
      router.push("/forbidden/login");
    },
    gotoPeriodForbidden() {
      router.push("/forbidden/period");
    },
    onSubmit() {
      if (!this.validateTransaction) {
        return;
      } else {
        this.uploadTransaction();
      }
    },
    getDataPembayaran() {
      User.getDataPembayaran(
        process.env.VUE_APP_URL,
        this.getAccessToken,
        this.getTermName
      ).then(response => {
        this.nominal = response.payment.nominal;
        if (response.payment.status == 0) {
          this.isUploaded = false;
          this.isPaymentAccepted = null;
        } else if (response.payment.status == 3) {
          this.isUploaded = true;
          this.isPaymentAccepted = false;
        } else if (response.payment.status == 1) {
          this.isPaymentAccepted = null;
          this.isUploaded = true;
        } else if (response.payment.status == 2) {
          this.isPaymentAccepted = true;
          this.isUploaded = true;
          this.whatsappLink = response.payment.whatsapp_link;
        }
      });
    },
    copyText(str) {
      const el = document.createElement("textarea");
      el.value = this.$refs[str].innerHTML;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    },
    uploadTransaction() {
      User.uploadTransactionProof(
        process.env.VUE_APP_URL,
        this.getAccessToken,
        this.getTermName,
        this.form
      ).then(() => {
        this.getDataPembayaran();
      });
    }
  },
  computed: {
    ...mapGetters({
      getAccessToken: "getAccessToken",
      getUserId: "getUserId",
      getUserRole: "getUserRole",
      getTermName: "getTermName",
      getPaymentPeriodOpened: "getPaymentPeriodOpened"
    }),
    validateTransaction() {
      const files = this.form.transactionImg;
      if (files == null) return false;
      const expectedExtensionFiles = ["jpg", "png", "JPG", "PNG"];
      const extensionFilesList = files.name.split(".");
      const extensionFiles = extensionFilesList[extensionFilesList.length - 1];
      if (expectedExtensionFiles.includes(extensionFiles)) return true;
      return false;
    }
  }
};
</script>

<style lang="scss">
@media only screen and (min-width: 768px) {
  h1.header-title {
    font-size: $h1 !important;
  }

  h2.header-title {
    font-size: $h2 !important;
  }

  h3.header-title {
    font-size: $h3 !important;
  }

  .hero-message {
    margin-bottom: 5%;
    max-width: 50%;
  }
  .message {
    max-width: 100% !important;
    font-size: 16px !important;
  }
}

.rejected {
  color: red;
}

.hero-message {
  max-width: 75%;
  margin-bottom: $gap-m-2;
}

.message {
  margin-top: $gap-sm-1;
  text-align: center;
  max-width: 80%;
  font-size: 12px;
}

.message-container {
  min-width: 20%;
  max-height: 40%;
  margin-bottom: $gap-m-2;
}

.header-title {
  color: $primary;
  margin-bottom: $gap-m-1;
  text-align: center;
  font-size: 16px;
}

.red {
  color: #eb4d55;
}

.black {
  color: #000000;
}

.svg-4 {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
  max-width: 40%;
  max-height: 20%;
}

.svg-5 {
  position: absolute;
  z-index: -2;
  bottom: 0;
  left: 0;
  max-width: 40%;
  max-height: 25%;
}

.svg-6 {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: -1;
  max-width: 40%;
  max-height: 50%;
}

.svg-7 {
  position: absolute;
  z-index: -2;
  bottom: 0;
  right: 0;
  max-width: 30%;
  max-height: 50%;
}
</style>