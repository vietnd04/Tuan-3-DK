<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Trang chủ</router-link> |
        <router-link to="/about">Giới thiệu</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3d41;
  margin-top: 20px;
}

header {
  margin-bottom: 20px;
}

nav {
  padding: 15px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

nav a {
  font-weight: bold;
  color: #2c3d41;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 4px;
}

nav a.router-link-exact-active {
  color: white;
  background-color: #42b983;
}

main {
  padding: 20px;
}
</style>