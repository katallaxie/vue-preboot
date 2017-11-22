import bootstrap from './boot'

export default context => {
  // @todo async-await
  return new Promise((resolve, reject) => {
    const { app, router, store } = bootstrap()
    router.push(context.url)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      // @todo async-await
      Promise.all(matchedComponents.map((Component: any) => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
