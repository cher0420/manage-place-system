<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import 'style/init.css';
  @import 'style/index';
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  font-size:14px;
  color:#303133;
  height:100%;
  min-height:100vh;
}
</style>
