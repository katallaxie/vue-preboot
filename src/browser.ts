// import { app } from './app'
// import Vue from 'vue';

// const app = new Vue({
//   el: '#app',
//   template: `
//   <div>Test</div>
//   `,
//   data: {
//     message: 'Hello Vue.js!'
//   },
//   render (h) {
//     return (
//       <div>
//         <span>Hello</span> world!
//       </div>>
//     )
//   }
// })


// app.$mount()

import Vue from 'vue'
import { App } from './components/app'

// bootstrap application
const app = new Vue({
  el: '#app',
  render: (h) => h(App)
})
