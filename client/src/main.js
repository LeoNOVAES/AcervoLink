import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import Bootstrap from 'bootstrap-vue'

Vue.use(Bootstrap);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})