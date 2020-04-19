<template>
  <header class="header-container">
    <nav class="nav-container">
      <img class="logo-nav desktop" src="@/assets/logo.png" alt="logo" />
      <ul>
        <li>
          <router-link class="nav-link" to="/" @click.native="changeMobileNav('home')">
            <span
              class="material-icons mobile"
              :class="{ 'active' : isMobileNavActive == 'home' }"
            >home</span>
          </router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/program" @click.native="changeMobileNav('program')">
            <span
              class="material-icons mobile"
              :class="{ 'active' : isMobileNavActive == 'program' }"
            >work</span>
          </router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/about" @click.native="changeMobileNav('about')">
            <span
              class="material-icons mobile"
              :class="{ 'active' : isMobileNavActive == 'about' }"
            >supervised_user_circle</span>
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="right-header">
      <img class="logo-nav mobile" src="@/assets/logo.png" alt="logo" />
      <div class="wrapper-link">
        <router-link class="nav-link" to="/sign/up">Daftar</router-link>
        <router-link class="nav-link" to="/sign/in">
          <button class="login btn primary">Masuk</button>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import store from "@/store";

export default {
  name: "NavBeforeLogin",
  data() {
    return {
      isMobileNavActive: "home"
    };
  },
  methods: {
    changeMobileNav(path) {
      this.isMobileNavActive = path;
    }
  },
  created() {
    store.dispatch("hideAlertError");
    store.dispatch("resetUserInfo");
    store.commit("removeToken");
  }
};
</script>

<style lang="scss" scoped>
@media only screen and (min-width: 768px) {
  .nav-link {
    width: 140px;
  }

  .header-container {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 10vh !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    background: white !important;
    box-shadow: 0 4px 10px rgba($color: #aaa, $alpha: 0.1) !important;

    .nav-container {
      width: auto !important;
      position: static !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      margin-left: 5% !important;
      background: transparent;
      box-shadow: none !important;

      ul {
        list-style: none !important;
        margin: 0 !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;

        li {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
      }
    }

    .right-header {
      width: auto !important;
      position: static !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      margin-right: 5% !important;
      background: transparent !important;
      box-shadow: none !important;

      button {
        margin: 0 !important;
      }
    }
  }

  .mobile {
    display: none !important;
  }

  .desktop {
    display: block !important;
  }
}

.mobile {
  display: block;
}

.desktop {
  display: none;
}

i.material-icons:hover {
  color: $primary;
}

.material-icons.mobile {
  color: #cad3de;

  &.active {
    color: $black;
  }
}

.header-container {
  position: fixed;
  z-index: 200;

  .nav-container {
    height: 8vh;
    width: 100%;
    background: white;
    box-shadow: 4px 0 10px rgba($color: #aaa, $alpha: 0.1);
    position: inherit;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    ul {
      width: inherit;
      list-style: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0;
      padding: 0;
      margin: 0 10%;

      a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &:active {
          color: $primary;
        }
      }
    }
  }

  .right-header {
    width: 100%;
    height: 8vh;
    background: white;
    box-shadow: 0 4px 10px rgba($color: #aaa, $alpha: 0.1);
    position: inherit;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      margin-left: 5%;
      max-height: 60%;
    }

    .wrapper-link {
      margin-right: 5%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
