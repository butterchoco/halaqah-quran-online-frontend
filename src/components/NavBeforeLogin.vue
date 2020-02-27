<template>
  <header id="header" class="header-container">
    <div class="header-mobile">
      <img class="logo-nav" src="@/assets/logo.png" alt="logo" />
      <div class="right-header">
        <button class="login btn primary" v-if="mobile">
          <svg class="login-icon" viewBox="0 0 24 24">
            <path
              d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"
            />
          </svg>login
        </button>
        <div class="mob-btn" @click="dropdownActivate" :class="{ active: isDropdownActive }">
          <div class="line one"></div>
          <div class="line two"></div>
        </div>
      </div>
    </div>
    <nav class="nav-container" v-if="isDropdownActive">
      <ul>
        <li>
          <router-link class="nav-link home" to="/">home</router-link>
        </li>
        <li>
          <router-link class="nav-link program" to="/program">program</router-link>
        </li>
        <li>
          <router-link class="nav-link about" to="/about">about</router-link>
        </li>
      </ul>
      <button class="login btn primary" v-if="!mobile">
        <svg class="login-icon" viewBox="0 0 24 24">
          <path
            d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"
          />
        </svg>login
      </button>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isDropdownActive: false,
      mobile: true
    };
  },
  methods: {
    dropdownActivate() {
      this.isDropdownActive = !this.isDropdownActive;
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

      ul {
        width: auto !important;
        flex-direction: row !important;

        a {
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

    .login {
      margin: auto $gap-m-1 !important;
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

  .login {
    margin: auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    cursor: pointer;

    .login-icon {
      fill: white;
      max-width: 16px;
      margin-right: $gap-sm-1;
    }

    &:hover > .login-icon {
      fill: $black;
    }
  }

  .nav-container {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    align-items: flex-start;

    ul {
      width: inherit;
      height: inherit;
      text-decoration: none;
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      li {
        flex: 1;
        width: 100%;
        height: inherit;

        a.nav-link {
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
