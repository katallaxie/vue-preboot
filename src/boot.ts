import { App } from './components/app'
import { sync } from 'vuex-router-sync'
import Vue from 'vue'

// create function
export default function(store, router) {
  // route state store
  sync(store, router)

  // constructing app
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
