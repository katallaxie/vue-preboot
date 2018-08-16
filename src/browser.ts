import bootstrap from './boot'
import createStore from './store'
import createRouter from './router'

// create store
const store = createStore()

// create router
const router = createRouter()

// import css
import './boot.css'

// bootstraping app
const { app } = bootstrap(store, router)

// mounting new initial state
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false

    if (store.state.error) {
      store.commit('CLEAR_ERROR')
    }

    const activated = matched.filter((component, i) => {
      return diffed || (diffed = prevMatched[i] !== component)
    })
    if (!activated.length) {
      return next()
    }
    Promise.all(
      activated.map((c: any) => {
        if (c.asyncData) {
          return c.asyncData({ store, route: to })
        }
      })
    )
      .then(() => {
        next()
      })
      .catch(next)
  })

  // actually mount to DOM
  app.$mount('#app')
})

// sw, save for later
// if (window.location.protocol === 'https:' && navigator.serviceWorker) {
//   navigator.serviceWorker.register('/sw.js')
// }
