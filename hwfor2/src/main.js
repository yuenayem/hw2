import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './router/index.js'
import Vuex from 'vuex'
import state from './store'

Vue.config.productionTip = false

const router = new VueRouter({
  routes: Routes
})
Vue.use(VueRouter)
Vue.use(Vuex)

new Vue({
  el: "#app",
  router: router,
  store: state,
  render: h => h(App)
})
