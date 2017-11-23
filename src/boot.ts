import Vue from 'vue'
import { App } from './components/app'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'

// create function
export default function () {
  // route state store
  sync(store, router)

  // constructing app
  const app = new Vue({
    router,
    store,
    render: (h) => h(App)
  })

  return { app, router, store }
}
