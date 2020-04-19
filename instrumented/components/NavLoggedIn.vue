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
            <p class="link-text" :class="{ 'active' : isMobileNavActive == 'home' }">Beranda</p>
          </router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/program" @click.native="changeMobileNav('program')">
            <span
              class="material-icons mobile"
              :class="{ 'active' : isMobileNavActive == 'program' }"
            >work</span>
            <p class="link-text" :class="{ 'active' : isMobileNavActive == 'program' }">Program</p>
          </router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/about" @click.native="changeMobileNav('about')">
            <span
              class="material-icons mobile"
              :class="{ 'active' : isMobileNavActive == 'about' }"
            >people</span>
            <p class="link-text" :class="{ 'active' : isMobileNavActive == 'about' }">About</p>
          </router-link>
        </li>
        <li>
          <div class="nav-link" @click="dropdownActive">
            <span class="material-icons mobile" :class="{ 'active' : isDropdownActive }">face</span>
          </div>
        </li>
      </ul>
    </nav>
    <div class="right-header">
      <div class="profile desktop" @click="dropdownActive">
        <span class="material-icons">face</span>
        <p class="username">{{ getUsername }}</p>
        <span class="material-icons">arrow_drop_down</span>
      </div>
      <div class="profile-container" v-if="isDropdownActive">
        <ul class="nav-profile">
          <li class="nav-profile-link" v-if="getUserRole[getUserRole.length-1].role_id == 2">
            <span class="material-icons mobile">today</span>
            <router-link to="/" class="link" v-on:click.native="dropdownActive">Jadwal</router-link>
          </li>
          <li class="nav-profile-link" v-if="getUserRole[getUserRole.length-1].role_id == 2">
            <span class="material-icons mobile">swap_horizontal</span>
            <router-link to="/" class="link" v-on:click.native="dropdownActive">Transaksi</router-link>
          </li>
          <li class="nav-profile-link" v-if="getUserRole[getUserRole.length-1].role_id == 2">
            <span class="material-icons mobile">trending_up</span>
            <router-link to="/" class="link" v-on:click.native="dropdownActive">Laporan</router-link>
          </li>
          <li
            class="nav-profile-link"
            v-if="getUserRole[getUserRole.length-1].role_id == 1 || getUserRole[getUserRole.length-1].role_id == 2"
          >
            <span class="material-icons mobile">trending_up</span>
            <router-link to="/pengumuman" class="link" v-on:click.native="dropdownActive">Pengumuman</router-link>
          </li>
          <li class="nav-profile-link" v-if="getUserRole[getUserRole.length-1].role_id == 4">
            <span class="material-icons mobile">trending_up</span>
            <router-link
              to="/data-calon-peserta"
              class="link"
              v-on:click.native="dropdownActive"
            >Data Calon Peserta</router-link>
          </li>
          <li class="nav-profile-link">
            <span class="material-icons mobile">power_settings_new</span>
            <a class="link" @click="logout">Keluar</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import store from "@/store";
import { mapGetters } from "vuex";
import User from "@/services/User";

export default {
  data() {
    return {
      isDropdownActive: false,
      isMobileNavActive: "home"
    };
  },
  methods: {
    changeMobileNav(path) {
      this.isDropdownActive = false;
      this.isMobileNavActive = path;
    },
    logout() {
      store.commit("removeToken");
      store.dispatch("resetUserInfo");
      window.location.href = "/";
    },
    resetToken() {
      store.dispatch("resetAccessToken");
    },
    dropdownActive() {
      this.isDropdownActive = !this.isDropdownActive;
    }
  },
  computed: {
    ...mapGetters({
      getUsername: "getUsername",
      getAccesstoken: "getAccessToken",
      getUserRole: "getUserRole",
      getRefreshToken: "getRefreshToken"
    })
  },
  created() {
    store.dispatch("hideAlertError");
    if (this.getRefreshToken == null) {
      this.logout();
    }
    this.resetToken();
    User.getInfo(process.env.VUE_APP_URL, this.getAccesstoken);
    User.getRole(process.env.VUE_APP_URL, this.getAccesstoken);
  }
};
</script>

<style lang="scss" scoped>
@media only screen and (min-width: 768px) {
  .nav-link {
    width: 140px;
  }

  .mobile {
    display: none !important;
  }

  .desktop {
    display: block !important;
  }

  .header-container {
    position: fixed !important;
    z-index: 200;
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

          p.link-text {
            display: block !important;
            &.active {
              color: $white;
              background: $primary;
              padding: 5px 20px;
              border-radius: 20px;
            }
          }
        }
      }
    }

    .right-header {
      width: auto !important;
      position: static !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: center !important;
      align-items: center !important;
      margin-right: 5% !important;
      background: transparent !important;
      box-shadow: none !important;

      .profile {
        display: flex !important;
        align-items: center !important;
        justify-content: space-evenly !important;
        background: $primary !important;
        color: white !important;
        padding: $gap-sm-1 $gap-sm-2 !important;
        border-radius: 20px !important;
        cursor: pointer !important;

        .material-icons {
          color: inherit !important;
        }

        .username {
          margin: 0 $gap-sm-2 !important;
        }
      }

      .profile-container {
        position: absolute !important;
        background: $primary !important;
        box-shadow: 0 0 5px rgba($color: #222, $alpha: 0.1);
        border-radius: 20px !important;
        top: 8vh !important;
        left: initial !important;
        width: auto !important;
        height: auto !important;

        ul {
          list-style: none !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          margin: 0 !important;
          padding: 0 !important;

          li {
            width: 100% !important;
            height: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding: $gap-sm-1 $gap-sm-2 !important;

            .link {
              padding: $gap-sm-1 $gap-sm-4 !important;
              border-radius: 20px !important;
              color: white !important;
              white-space: pre;

              &:hover {
                background: white !important;
                color: $primary !important;
              }
            }
          }
        }
      }
    }
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
    z-index: 200;
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

      .nav-link {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        p.link-text {
          display: none;
        }

        &:active {
          color: $primary;
        }
      }
    }
  }

  .right-header {
    width: 100%;
    background: white;
    box-shadow: 0 4px 10px rgba($color: #aaa, $alpha: 0.1);
    position: inherit;
    z-index: 200;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      margin: auto;
      max-height: 80%;
    }

    .wrapper-link {
      margin-right: 5%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .profile-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;

      ul {
        width: 100%;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: $gap-sm-2 10%;
        padding: 0;

        li {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>