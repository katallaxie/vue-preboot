import Vue from 'vue'
import Router from 'vue-router'
import { Home } from '../components/home'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Home
    }
  ]
})
