import Vue from 'vue'
import App from './components/app'

// enables pwa
if (__PROD__) {
  require('./pwa')
}

// bootstrap application
const bootstrap = new Vue({
  render: (h) => h(App)
})

bootstrap.$mount('#app')
