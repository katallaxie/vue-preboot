import Vue from 'vue'
import { App } from './components/app'
import store from './store';
import router from './router';

// critical css
import './boot';

// enables pwa
if (__PROD__) {
  require('./pwa')
}

// bootstrap application
const bootstrap = new Vue({
  render: (h) => h(App),
  store,
  router
})

bootstrap.$mount('#app')
