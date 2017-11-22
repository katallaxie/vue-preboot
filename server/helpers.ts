import * as Path from 'path'
import * as express from 'express'

export const isProd = process.env.NODE_ENV === 'production'
export const resolve = file => Path.resolve(__dirname, file)
export const serve = (path, cache) => express.static(resolve(path), {
  // evalute times on prod
  maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0
})

export const createRenderer = (bundle, template) => {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return require('vue-server-renderer').createBundleRenderer(bundle, {
    template,
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15
    })
  })
}
