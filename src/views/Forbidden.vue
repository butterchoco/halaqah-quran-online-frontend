<template>
  <section class="maintenance-container vector-background col center">
    <ErrorMaintenance :img="img" :title="title" :msg="msg" :goto="goto" />
  </section>
</template>

<script>
import ErrorMaintenance from "@/components/ErrorPage";
export default {
  name: "Forbidden",
  components: {
    ErrorMaintenance
  },
  data() {
    return {
      img: "",
      title: "",
      msg: "",
      goto: []
    };
  },
  methods: {
    roleForbidden() {
      this.img = "";
      this.title = "";
      this.msg = "";
      this.goto = [];
    },
    loginForbidden() {
      this.img = require("@/assets/img/failed-selection.png");
      this.title = "Anda belum masuk";
      this.msg = "Masuk terlebih dahulu untuk mengakses halaman ini !";
      this.goto = [
        {
          str: "Masuk ke akun",
          link: "/sign/in"
        }
      ];
    },
    periodForbidden() {
      this.img = require("@/assets/img/failed-selection.png");
      this.title = "Periode belum dibuka";
      this.msg = "Anda belum bisa mengakses halaman ini !";
      this.goto = [
        {
          str: "Kembali ke beranda",
          link: "/"
        }
      ];
    }
  },
  watch: {
    $route() {
      if (this.$route.path == "/forbidden/login") {
        this.loginForbidden();
      } else if (this.$route.path == "/forbidden/role") {
        this.roleForbidden();
      } else if (this.$route.path == "/forbidden/period") {
        this.periodForbidden();
      }
    }
  },
  created() {
    if (this.$route.path == "/forbidden/login") {
      this.loginForbidden();
    } else if (this.$route.path == "/forbidden/role") {
      this.roleForbidden();
    } else if (this.$route.path == "/forbidden/period") {
      this.periodForbidden();
    }
  }
};
</script>

<style lang="scss" scoped>
.maintenance-container {
  height: inherit;
}
</style>