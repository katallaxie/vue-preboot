
import * as express from 'express'
import * as fs from 'fs'
import setupDevServer from '../config/server'

// helpers
import { serve, createRenderer, resolve } from './helpers'
import { DevServerConfig } from '../config/custom'

// config
const isProd = process.env.NODE_ENV === 'production'

// app
const app = express()
const port = process.env.PORT || DevServerConfig.port

let renderer
let readyPromise
if (isProd) {
  const bundle = require('../public/vue-ssr-server-bundle.json')
  const clientManifest = require('../public/client/vue-ssr-client-manifest.json')
  const template = fs.readFileSync(resolve('../public/client/index.html'), 'utf-8')
  renderer = createRenderer(bundle, template, {
    clientManifest
  })
  readyPromise = Promise.resolve()
} else {
  readyPromise = setupDevServer(app, (bundle, template, options) => {
    renderer = createRenderer(bundle, template, options)
  })
}

app.use('/client', serve('../public/client', false))

app.get('*', (req, res) => {
  if (!renderer) {
    return res.end('waiting for compilation... refresh in a moment.')
  }

  const s = Date.now()

  res.setHeader('Content-Type', 'text/html')

  const errorHandler = err => {
    if (err && err.code === 404) {
      res.status(404).end('404 | Page Not Found')
    } else {
      // Render Error Page or Redirect
      res.status(500).end('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err)
    }
  }

  renderer.renderToStream({ url: req.url })
    .on('error', errorHandler)
    .on('end', () => console.log(`whole request: ${Date.now() - s}ms`))
    .pipe(res)
})


// start server
const server = app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
