import Vue from 'vue'
import App from './App.vue'
import VueCroppie from 'vue-croppie'

Vue.use(VueCroppie)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
