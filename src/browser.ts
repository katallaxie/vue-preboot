import bootstrap from './boot'

// bootstraping app
const { app, router, store } = bootstrap()

// mounting new initial state
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// reading
router.onReady(() => {
  // use router hook for handling async data.
  // we do it after initial route, so that we don't double-fetch data.

  // Use router.beforeResolve() so that all async components are resolved.
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })

    if (!activated.length) {
      return next()
    }

    // start loading
    Promise.all(activated.map((c: any) => {
      if (c.asyncData) {
        return c.asyncData({ store, route: to })
      }
    })).then(() => {
      // stop loading indicator
      next()
    }).catch(next)
  })

  app.$mount('#app')
})

// sw, save for later
// if (window.location.protocol === 'https:' && navigator.serviceWorker) {
//   navigator.serviceWorker.register('/sw.js')
// }
