<template lang="pug">
  #app
    #nav
      router-link(to="/") 概览
      | |
      router-link(to="/log") 日志
    router-view.view
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 90vw;
  height: 100vh;
  position: absolute;
  left: 5vw;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  .view {
    flex: auto;
  }
  #nav {
    padding: 30px;
    a {
      padding: 20px;
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}
</style>
