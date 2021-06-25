<template>
  <div id="app">
    <h1>Welcome to my HTL Assessment</h1>
    <img alt="Vue logo" src="./assets/car_loop.gif">
    <Workorder />
  </div>
</template>

<script>
import Workorder  from './components/Workorder.vue'

export default {
  name: 'App',
  components: {
    Workorder
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background:#A4C6E8;
  height:100%;
  padding: 2% 0;
  min-height:150vh;
}

#app img {
  max-width:25%;
}
</style>
