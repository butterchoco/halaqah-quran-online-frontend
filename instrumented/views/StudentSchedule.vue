<template>
  <section class="student-schedule-container">
    <b-container>
      <b-row align-h="center">
        <b-col sm="12" md="8">
          <h3 class="header-title">Pilih Jadwal Setoran</h3>
          <b-calendar
            block
            hide-header
            class="calendar"
            v-model="selectedDate"
            :min="dateMin"
            :max="dateMax"
            locale="en"
          ></b-calendar>
        </b-col>
        <b-col sm="12" md="4">
          <div class="detail-pilihan-container">
            <h3 class="header-title">Detail Pilihan</h3>
          </div>
        </b-col>
      </b-row>
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
      selectedDate: ""
    };
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
    min-height: inherit;
    padding: $gap-m-1;
    box-shadow: 0 0 6px rgba($color: #aaa, $alpha: 0.12);
  }
}
</style>