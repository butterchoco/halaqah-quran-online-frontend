<template>
  <header id="header" class="header-container" :class="{ scrolledHeader: isScrolled }">
    <div class="header-mobile">
      <img class="logo-nav" src="@/assets/logo.png" alt="logo" />
      <div class="right-header">
        <div class="mob-btn" @click="dropdownActivate" :class="{ active: isDropdownActive }">
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
        <button class="profile btn primary" @click="profileDropdownActivate">
          <svg class="profile-icon" viewBox="0 0 24 24">
            <path
              d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"
            />
          </svg>
          {{ user.name }}
          <div class="circle">
            <img src="@/assets/img/arrow-down.png" alt="arrow" />
          </div>
        </button>
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
            <router-link to="/" class="link">Logout</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isDropdownActive: false,
      isProfileDropdownActive: false,
      isScrolled: false,
      mobile: true,
      user: {
        name: "dummy"
      }
    };
  },
  methods: {
    dropdownActivate() {
      this.isDropdownActive = !this.isDropdownActive;
    },
    profileDropdownActivate() {
      console.log(true);
      this.isProfileDropdownActive = !this.isProfileDropdownActive;
    }
  },
  mounted() {
    if (window.innerWidth > 768) {
      this.isDropdownActive = true;
      this.mobile = false;
    }
    if (!this.mobile) {
      window.document.onscroll = () => {
        const header = document.getElementById("header");
        if (window.scrollY > header.offsetTop) {
          this.isScrolled = true;
        } else {
          this.isScrolled = false;
        }
      };
    } else {
      this.isScrolled = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@media only screen and (min-width: 768px) {
  .header-container {
    flex-direction: row !important;
    padding: 10px 0;

    .profile-container {
      top: 2rem !important;
      right: 2rem !important;
      transform: none;
      margin: auto $gap-m-1 !important;
      position: absolute !important;

      ul.nav-profile {
        position: relative !important;
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
            padding: 2rem 0 !important;
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
    }
  }
}

.scrolledHeader {
  box-shadow: 0 4px 20px rgba($color: #222, $alpha: 0.05);
  transition: box-shadow 0.5s ease;
}

.header-container {
  position: fixed;
  top: 0;
  left: 0;
  background: white;
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
    margin: 1rem auto;
    border-radius: 20px;

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
    justify-content: center;
    padding: 5px 10px;
    cursor: pointer;

    .circle {
      background: white;
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      margin-left: $gap-sm-2;

      img {
        max-width: 100%;
      }
    }

    .profile-icon {
      fill: white;
      max-width: 16px;
      margin-right: $gap-sm-1;
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
    align-items: flex-start;

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
