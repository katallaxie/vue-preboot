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
import * as process from 'process';

// import { NgcWebpackPlugin } from 'ngc-webpack';
import * as webpackMerge from 'webpack-merge';

// helpers
import { isWebpackDevServer, root } from './config/helpers';

// defaults
import {
  DefaultCommonConfig,
  DefaultDevConfig,
  DefaultProdConfig
} from './config/default';

// custom
import {
  CustomCommonConfig,
  CustomDevConfig,
  CustomProdConfig,
  DevServerConfig
} from './config/custom';

// config
const EVENT = process.env.npm_lifecycle_event;
const ENV = process.env.NODE_ENV || 'development';

// dll's
import { polyfills } from './config/dll';

const envConfig = {
  isDev: EVENT.includes('dev'),
  port: process.env.PORT || ENV === 'development' ? DevServerConfig.port : 8080,
  host: process.env.HOST || 'localhost'
};

// common
const commonConfig = () => {
  const config: WebpackConfig = {} as WebpackConfig;

  config.context = root();

  config.module = {
    rules: [
      ...DefaultCommonConfig(envConfig).rules,
      ...CustomCommonConfig.rules
    ]
  };

  config.plugins = [
    ...DefaultCommonConfig(envConfig).plugins,
    ...CustomCommonConfig.plugins
  ];

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
  };

  return config;
};

// dev
const devConfig = () => {
  const config: WebpackConfig = {} as WebpackConfig;

  config.devtool = 'cheap-module-source-map';

  config.module = {
    rules: [...DefaultDevConfig().rules, ...CustomDevConfig.rules]
  };

  config.plugins = [
    ...DefaultDevConfig().plugins,
    ...CustomDevConfig.plugins
  ];

  config.resolve = {
    modules: [root(`src`), `node_modules`]
  };

  config.entry = {
    main: [].concat(polyfills(), './src/browser')
  };

  config.output = {
    path: root(`public`),
    filename: '[name].bundle.js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[id].chunk.js'
  };

  if (isWebpackDevServer) {
    config.devServer = {
      contentBase: root(`src`),
      historyApiFallback: true,
      host: envConfig.host,
      port: envConfig.port,

      ...DevServerConfig.options
    };
  }

  return config;
};

// prod
const prodConfig = () => {
  const config: WebpackConfig = {} as WebpackConfig;

  config.devtool = 'source-map';

  config.module = {
    rules: [...DefaultProdConfig().rules, ...CustomProdConfig.rules]
  };

  config.entry = {
    main: './src/browser',
    polyfills: polyfills()
  };

  config.performance = {
    hints: 'warning'
  };

  config.devtool = false,

    config.output = {
      publicPath: '/',
      path: root(`public`),
      filename: '[name].[chunkhash].bundle.js',
      sourceMapFilename: '[name].[chunkhash].bundle.map',
      chunkFilename: '[id].[chunkhash].chunk.js'
    };

  config.plugins = [
    ...DefaultProdConfig().plugins,
    ...CustomProdConfig.plugins
  ];

  return config;
};

// default
const defaultConfig = () => {
  const config: WebpackConfig = {} as WebpackConfig;

  config.resolve = {
    extensions: ['.ts', '.tsx', '.vue', '.js', '.json', '.css', '.scss']
  };

  return config;
};

// webpack
switch (ENV) {
  case 'prod':
  case 'production':
    module.exports = webpackMerge(
      {},
      defaultConfig(),
      prodConfig(),
      commonConfig()
    );
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = webpackMerge(
      {},
      defaultConfig(),
      commonConfig(),
      devConfig()
    );
}
