import bootstrap from './boot'
import createStore from './store'
import createRouter from './router'

// server entry point
export default context => {
  // @todo async-await
  return new Promise((resolve, reject) => {
    // create store
    const store = createStore()

    // create router
    const router = createRouter()

    // boot app
    const { app } = bootstrap(store, router)

    // replace the context
    router.replace(context.url)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      // @todo async-await
      Promise.all(
        matchedComponents.map((Component: any) => {
          if (Component.asyncData) {
            return Component.asyncData({
              store,
              route: router.currentRoute
            })
          }
        })
      )
        .then(() => {
          context.state = store.state
          resolve(app)
        })
        .catch(reject)
    }, reject)
  })
}
