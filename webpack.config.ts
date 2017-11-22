/**
 *
 * - imports
 * - custom
 * - config
 * - common
 * - dev
 * - dll
 * - prod
 * - webpack
 */

// node
import * as process from 'process'

import * as webpackMerge from 'webpack-merge'

// helpers
import { isWebpackDevServer, root } from './config/helpers'

// defaults
import {
  DefaultCommonConfig,
  DefaultDevConfig,
  DefaultProdConfig,
  DefaultSsrConfig
} from './config/default'

// custom
import {
  CustomCommonConfig,
  CustomDevConfig,
  CustomProdConfig,
  DevServerConfig
} from './config/custom'

// config
const EVENT = process.env.npm_lifecycle_event
const ENV = process.env.NODE_ENV || 'development'

// dll's
import { polyfills } from './config/dll'
import { CustomSSRConfig } from './config/custom';

const envConfig = {
  isDev: EVENT.includes('dev'),
  isSSR: EVENT.includes('server'),
  port: process.env.PORT || ENV === 'development' ? DevServerConfig.port : 8080,
  host: process.env.HOST || 'localhost'
}

// common
const commonConfig = () => {
  const config: WebpackConfig = {} as WebpackConfig

  config.context = root()

  config.module = {
    rules: [
      ...DefaultCommonConfig(envConfig).rules,
      ...CustomCommonConfig.rules
    ]
  }

  config.plugins = [
    ...DefaultCommonConfig(envConfig).plugins,
    ...CustomCommonConfig.plugins
  ]

  config.node = {
    Buffer: false,
    clearImmediate: false,
    clearTimeout: true,
    crypto: true,
    global: true,
    module: false,
    process: true,
    setImmediate: false,
    setTimeout: true
  }

  return config
}

// dev
const devConfig = () => {
  const config: WebpackConfig = {} as WebpackConfig

  config.devtool = 'cheap-module-source-map'

  config.module = {
    rules: [...DefaultDevConfig().rules, ...CustomDevConfig.rules]
  }

  config.plugins = [
    ...DefaultDevConfig().plugins,
    ...CustomDevConfig.plugins
  ]

  config.resolve = {
    modules: [root(`src`), `node_modules`]
  }

  config.entry = {
    main: [].concat(polyfills(), './src/browser')
  }

  config.output = {
    path: root(`public`),
    filename: '[name].bundle.js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[id].chunk.js'
  }

  if (isWebpackDevServer) {
    config.devServer = {
      contentBase: root(`src`),
      historyApiFallback: true,
      host: envConfig.host,
      port: envConfig.port,

      ...DevServerConfig.options
    }
  }

  return config
}

// prod
const prodConfig = () => {
  const config: WebpackConfig = {} as WebpackConfig

  config.devtool = false

  config.module = {
    rules: [...DefaultProdConfig().rules, ...CustomProdConfig.rules]
  }

  config.entry = {
    main: './src/browser',
    polyfills: polyfills()
  }

  config.performance = {
    hints: 'warning'
  }

  config.output = {
    path: root(`public/client`),
    publicPath: '/client/',
    filename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[name].[chunkhash].bundle.map',
    chunkFilename: '[id].[chunkhash].chunk.js'
  }

  config.plugins = [
    ...DefaultProdConfig().plugins,
    ...CustomProdConfig.plugins
  ]

  return config
}

// ssr
const ssrConfig = () => {
  const config: WebpackConfig = {} as WebpackConfig

  config.devtool = false

  config.module = {
    rules: [...DefaultSsrConfig(envConfig).rules, ...CustomSSRConfig.rules]
  }

  config.target = 'node'

  config.entry = {
    main: './src/server',
  }

  config.performance = {
    hints: 'warning'
  }

  config.output = {
    path: root(`public`),
    filename: '[name].[chunkhash].bundle.js',
    libraryTarget: 'commonjs2'
  }

  config.plugins = [
    ...DefaultSsrConfig(envConfig).plugins,
    ...CustomProdConfig.plugins
  ]

  config.externals = Object.keys(require('./package.json').dependencies)

  return config
}

// default
const defaultConfig = () => {
  const config: WebpackConfig = {} as WebpackConfig

  config.resolve = {
    extensions: ['.ts', '.tsx', '.vue', '.js', '.json', '.css', '.scss']
  }

  return config
}

// webpack
switch (ENV) {
  case 'prod':
  case 'production':
    if (envConfig.isSSR) {
      module.exports = webpackMerge(
        {},
        defaultConfig(),
        ssrConfig(),
        commonConfig()
      )
      break
    }

    module.exports = webpackMerge(
      {},
      defaultConfig(),
      prodConfig(),
      commonConfig()
    )
    break
  case 'dev':
  case 'development':
  default:
    module.exports = webpackMerge(
      {},
      defaultConfig(),
      commonConfig(),
      devConfig()
    )
}
