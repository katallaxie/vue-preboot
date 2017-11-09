import Vue from 'vue'
import App from './components/app'

// bootstrap application
const bootstrap = new Vue({
  render: (h) => h(App)
})

bootstrap.$mount('#app')
