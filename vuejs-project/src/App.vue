<template>
  <div id="app">
    <header>
      <h1>My Vue Project</h1>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/todo">Todo List</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "App"
}
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
header {
  background-color: #42b983;
  color: white;
  padding: 20px;
  text-align: center;
}
nav a {
  color: #fff;
  margin: 0 10px;
  text-decoration: none;
}
main {
  padding: 20px;
}
</style>
