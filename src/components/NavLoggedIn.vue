<template>
  <header id="header" class="header-container">
    <div class="header-mobile">
      <img class="logo-nav" src="@/assets/logo.png" alt="logo" />
      <div class="right-header">
        <div
          class="mob-btn"
          @click="dropdownActivate"
          :class="{ active: isDropdownActive }"
        >
          <div class="line one"></div>
          <div class="line two"></div>
        </div>
      </div>
    </div>
    <nav class="nav-container" v-if="isDropdownActive">
      <ul class="navigation">
        <li class="nav-link">
          <router-link class="link home" to="/">home</router-link>
        </li>
        <li class="nav-link">
          <router-link class="link program" to="/program">program</router-link>
        </li>
        <li class="nav-link">
          <router-link class="link about" to="/about">about</router-link>
        </li>
      </ul>
      <div class="profile-container">
        <div class="profile btn primary" @click="profileDropdownActivate">
          <div class="row center">
            <div class="profile-icon">
              <i class="material-icons">people</i>
              </div>
            <p>{{ user.name }}</p>
          <div class="circle">
            <img src="@/assets/img/arrow-down.png" alt="arrow" />
          </div>
          </div>
        </div>
        <ul class="nav-profile" v-if="isProfileDropdownActive">
          <li class="nav-profile-link">
            <router-link to="/" class="link">Jadwal</router-link>
          </li>
          <li class="nav-profile-link">
            <router-link to="/" class="link">Pembayaran</router-link>
          </li>
          <li class="nav-profile-link">
            <router-link to="/" class="link">Laporan</router-link>
          </li>
          <li class="nav-profile-link">
            <router-link to="/" class="link" v-on:click.native="logout">Logout</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      isDropdownActive: false,
      isProfileDropdownActive: false,
      mobile: true,
      user: {
        name: "dummy"
      }
    };
  },
  methods: {
    ...mapMutations(["removeToken"]),
    logout() {
      this.$store.commit("removeToken");
      window.location.pathname = "/";
    },
    dropdownActivate() {
      this.isDropdownActive = !this.isDropdownActive;
    },
    profileDropdownActivate() {
      this.isProfileDropdownActive = !this.isProfileDropdownActive;
    },
    windowToggle() {
      if (window.innerWidth > 768) {
        this.isDropdownActive = true;
        this.mobile = false;
      }
    }
  },
  mounted() {
    this.windowToggle();
  }
};
</script>

<style lang="scss" scoped>
@media only screen and (min-width: 768px) {
  .header-container {
    flex-direction: row !important;
    padding: 10px 0;
    height: 8vh;

    .profile-container {
      top: 2vh !important;
      right: 10% !important;
      transform: none;
      margin: auto $gap-m-1 !important;
      position: absolute !important;

      border-radius: 20px;
      width: auto !important;
      height: auto !important;
      padding: 0 !important;

      ul.nav-profile {
        position: relative !important;
        margin: $gap-m-1 0 !important;
      }
    }

    .header-mobile {
      width: auto !important;
      margin: auto 0 auto 10% !important;
    }

    .mob-btn {
      display: none !important;
    }

    .logo-nav {
      margin: auto $gap-m-1 auto 10% !important;
    }

    .nav-container {
      flex-direction: row !important;
      justify-content: space-between !important;
      margin-right: 2rem;

      ul.navigation {
        width: auto !important;
        flex-direction: row !important;

        li.nav-link {
          a.link {
            width: 140px !important;
            padding: 1rem 0 !important;
            display: flex;
            align-items: center !important;
            justify-content: center !important;

            &:hover {
              background: transparent !important;
              color: $black !important;
              font-weight: bold;
            }
          }
        }
      }
    }

    .profile {
      margin: auto $gap-m-1 !important;
      font-weight: bold;
      padding: 5px 10px;
      font-weight: bold;
      width: auto !important;
      height: auto !important;
    }
  }
}

.header-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  background: white;
  box-shadow: 0 4px 10px rgba($color: #222, $alpha: 0.1);
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  .right-header {
    display: flex;
  }

  .header-mobile {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .mob-btn {
    border: 1px solid $white;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: $gap-sm-2;
    width: 46px;
    margin: auto 2rem auto 1rem;

    div.line {
      background: #222;
      width: 24px;
      height: 1px;
      transition: all 0.5s ease;

      &.two {
        margin-top: $gap-sm-1;
      }
    }

    &.active {
      div.line {
        &.one {
          width: 10px;
        }

        &.two {
          width: 16px;
        }
      }
    }
  }

  .logo-nav {
    margin: 1rem 2rem 1rem 10%;
    height: 42px;
    width: 42px;
  }

  .profile-container {
    background: $primary;
    width: 100%;
    height: 100%;
    padding: $gap-m-1 $gap-m-1;

    ul.nav-profile {
      background: inherit;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      list-style: none;
      position: absolute;
      padding-left: 0;
      left: 50%;
      transform: translateX(-50%);
      margin: 0;

      li.nav-profile-link {
        width: 100%;
        height: 100%;
        padding: $gap-sm-2;

        .link {
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          border-radius: 10px;

          &:hover {
            background: white;
            color: $primary;
          }
        }
      }
    }
  }

  .profile {
    margin: auto 0;
    display: flex;
    align-items: center;
    cursor: pointer;

    font-weight: bold;
    width: 100%;
    height: 100%;

    .circle {
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      margin-left: $gap-sm-2;
      height: 24px;
      width: 24px;

      img {
        max-width: 100%;
      }
    }

    p {
      margin-left: $gap-sm-1;
    }

    .profile-icon {
      background: white;
      width: 24px;
      height: 24px;
      border-radius: 20px;
      margin-right: $gap-sm-2;
      max-width: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    i {
      color: $primary;
      font-size: 16px;
    }

    &:hover {
      background: darken($primary, 0.1);
      color: white;
    }
  }

  .nav-container {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

    ul.navigation {
      width: inherit;
      height: inherit;
      text-decoration: none;
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      li.nav-link {
        flex: 1;
        width: 100%;
        height: inherit;

        a.link {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 100%;
          height: inherit;
          padding: $gap-m-1 $gap-m-2;
          font-size: 14px;
          cursor: pointer;

          &:hover {
            background: $primary;
            color: white;
          }
        }
      }
    }
  }
}
</style>
