<template>
  <div>
    <b-toast
      id="my-toast"
      toaster="b-toaster-bottom-center"
      :visible="getShowAlertError"
      variant="warning"
      no-auto-hide
      solid
    >
      <template v-slot:toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
          <strong class="mr-auto">{{ getTitleAlertError }}</strong>
        </div>
      </template>
      {{ getMessageAlertError }}
    </b-toast>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ErrorToast",
  computed: {
    ...mapGetters({
      getShowAlertError: "getShowAlertError",
      getTitleAlertError: "getTitleAlertError",
      getMessageAlertError: "getMessageAlertError"
    })
  }
};
</script>

<style lang="scss" scoped>
</style>