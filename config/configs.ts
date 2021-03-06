import { WebpackConfig } from './webpack'

// node
import * as process from 'process'

// webpack
import * as webpackMerge from 'webpack-merge'

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
import { CustomSSRConfig } from './custom'

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
export const devConfig = () => {
  const config: WebpackConfig = {} as WebpackConfig

  config.devtool = 'cheap-module-source-map'

  config.mode = 'development'

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
    app: [...polyfills()].concat('./src/browser')
  }

  config.output = {
    path: root(`public`),
    publicPath: '/static/',
    filename: '[name].bundle.js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[id].chunk.js'
  }

  return config
}

// prod
export const prodConfig = () => {
  const config: WebpackConfig = {} as WebpackConfig

  config.mode = 'production'

  config.devtool = false

  config.module = {
    rules: [...DefaultProdConfig(envConfig).rules, ...CustomProdConfig.rules]
  }

  config.entry = {
    main: [...polyfills(), './src/browser'],
    pwa: './src/pwa'
  }

  config.optimization = {
    noEmitOnErrors: true, // NoEmitOnErrorsPlugin
    concatenateModules: true,
    minimize: false,
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0 // This is example is too small to create commons chunks
        },
        polyfills: {
          test: (m) => polyfills().indexOf(m.rawRequest) > -1,
          chunks: 'initial',
          name: 'polyfills',
          priority: -10,
          enforce: true
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: -20,
          enforce: true
        },
        default: false
      }
    }
  }

  config.performance = {
    hints: 'warning'
  }

  config.output = {
    path: root(`public`),
    publicPath: '/static/',
    filename: '[name].[hash].bundle.js',
    sourceMapFilename: '[name].[hash].bundle.map',
    chunkFilename: '[name].[chunkhash].chunk.js'
  }

  config.plugins = [
    ...DefaultProdConfig(envConfig).plugins,
    ...CustomProdConfig.plugins
  ]

  return config
}

// ssr
export const ssrConfig = () => {
  const config: WebpackConfig = {} as WebpackConfig

  config.mode = 'development'

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
    ...CustomSSRConfig.plugins
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

export default {
  ssrConfig: webpackMerge({}, defaultConfig(), ssrConfig(), commonConfig()),
  devConfig: webpackMerge({}, defaultConfig(), commonConfig(), devConfig()),
  prodConfig: webpackMerge({}, defaultConfig(), commonConfig(), prodConfig())
}
