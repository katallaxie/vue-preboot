
// helpers
import { createRenderer, resolve, isProd } from './helpers'
import { minify } from 'html-minifier'
import * as fs from 'fs'
import * as Path from 'path'

let renderer
let readyPromise

export function ready(app) {
  if (isProd) {
    const bundle = require('../public/vue-ssr-server-bundle.json')
    const clientManifest = require('../public/client/vue-ssr-client-manifest.json')
    const template = fs.readFileSync(resolve('../public/client/index.html'), 'utf-8')
    renderer = createRenderer(bundle, template, {
      clientManifest
    })
    readyPromise = Promise.resolve()
  } else {
    const setupDevServer = require('../config/server').default
    readyPromise = setupDevServer(app, (bundle, template, options) => {
      renderer = createRenderer(bundle, template, options)
    })
  }

  return readyPromise
}

export function render() {
  return async (ctx, next) => {
    await next

    if (!renderer) {
      ctx.res.end('waiting for compilation... refresh in a moment.')
      return
    }

    ctx.res.setHeader('Content-Type', 'text/html')

    const errorHandler = err => {
      if (err && err.code === 404) {
        ctx.res.status(404).end('404 | Page Not Found')
      } else {
        // Render Error Page or Redirect
        ctx.res.status(500).end('500 | Internal Server Error')
        console.error(`error during render : ${ctx.req.url}`)
        console.error(err)
      }
    }

    let body = ctx.body
    body = await renderer.renderToString({ url: ctx.req.url })
    ctx.body = minify(body)
  }
}

export {
  readyPromise
}
