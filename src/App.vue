<template>
  <div>
    <router-link to="/">
    <div class="header">Poker</div>

    </router-link>
    <router-view id="app"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.header {
  background: hsla(0,0%,10%,1);
  height: 30px;
}
</style>
