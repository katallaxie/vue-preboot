// node
import * as process from 'process'

// helpers
import { root } from './helpers'

// defaults
import {
  DefaultCommonConfig,
  DefaultDevConfig,
  DefaultProdConfig,
  DefaultSsrConfig
} from './default'

// custom
import {
  CustomCommonConfig,
  CustomDevConfig,
  CustomProdConfig,
  DevServerConfig
} from './custom'

// dll's
import { polyfills } from './dll'
import { CustomSSRConfig } from './custom';

// config
export const EVENT = process.env.npm_lifecycle_event
export const ENV = process.env.NODE_ENV || 'development'

export const envConfig = {
  isDev: ENV === 'development',
  isSSR: EVENT.includes('server'),
  port: process.env.PORT || ENV === 'development' ? DevServerConfig.port : 8080,
  host: process.env.HOST || 'localhost'
}

// common
export const commonConfig = () => {
  const config: WebpackConfig = {} as WebpackConfig

  config.context = root()

  config.module = {
    rules: [
      ...DefaultCommonConfig().rules,
      ...CustomCommonConfig.rules
    ]
  }

  config.plugins = [
    ...DefaultCommonConfig().plugins,
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
export const devConfig = () => {
  const config: WebpackConfig = {} as WebpackConfig

  config.devtool = 'cheap-module-source-map'

  config.module = {
    rules: [...DefaultDevConfig(envConfig).rules, ...CustomDevConfig.rules]
  }

  config.plugins = [
    ...DefaultDevConfig(envConfig).plugins,
    ...CustomDevConfig.plugins
  ]

  config.resolve = {
    modules: [root(`src`), `node_modules`]
  }

  config.entry = {
    app: [].concat(polyfills(), './src/browser')
  }

  config.output = {
    path: root(`public/client`),
    publicPath: '/client/',
    filename: '[name].bundle.js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[id].chunk.js'
  }

  return config
}

// prod
export const prodConfig = () => {
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
export const ssrConfig = () => {
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

  config.externals = Object.keys(require('../package.json').dependencies)

  return config
}

// default
export const defaultConfig = () => {
  const config: WebpackConfig = {} as WebpackConfig

  config.resolve = {
    extensions: ['.ts', '.tsx', '.vue', '.js', '.json', '.css', '.scss']
  }

  return config
}
