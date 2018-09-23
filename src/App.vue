<template>
  <div id="app">
    <header>
      <span style="flex: 10; "><i class="gi gi-emerald logo"></i> Vue Token Maker</span>
      <span><a href="https://github.com/rolodromo/playground-token-maker"><i class="fab fa-github github"></i></a></span>
    </header>
    <main>
      <cropper></cropper>
    </main>
  </div>
</template>

<script>
import Cropper from './components/Cropper.vue'

export default {
  name: 'App',
  components: {
    Cropper
  }
}
</script>

<style>
body {
  margin: 0;
}

.logo {
  font-size: 1.4em;
  padding: 0;
  margin: 0;
  display: inline;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495e;
  color: #ffffff;
  display: flex;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: 0.02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
a {
  color: inherit;
  text-decoration: inherit;
}
.github {
  font-size: 1.42em;
}
</style>
