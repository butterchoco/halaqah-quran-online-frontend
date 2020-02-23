<template>
  <header class="header-container">
    <img class="logo-nav" src="/assets/logo.png" alt="logo" />
    <nav class="nav-container">
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
      <button class>
        <i class="material-icons">account_circle</i>login
      </button>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>