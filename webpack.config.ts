// config & helpers
import Configs, { envConfig, ENV } from './config/configs'
const { devConfig, ssrConfig, prodConfig } = Configs

// webpack
switch (ENV) {
  case 'prod':
  case 'production':
    module.exports = envConfig.isSSR ? ssrConfig : prodConfig
    break
  case 'dev':
  case 'development':
  default:
    module.exports = devConfig
}
