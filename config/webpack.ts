export interface WebpackConfig {
  cache?: boolean;
  target?: string;
  mode?: string;
  optimization?: any;
  devtool?: string | boolean;
  entry: any;
  externals?: any;
  output: any;
  module?: any;
  context?: any;
  plugins?: any[];
  performance?:
    | boolean
    | {
        hints?: string;
        assetFilter?: string;
        maxEntrypointSize?: string;
        maxAssetSize?: string;
      };
  resolve?: {
    extensions?: string[];
    modules?: string[];
    alias?: any;
  };
  devServer?: {
    contentBase?: string;
    port?: number;
    historyApiFallback?: boolean;
    hot?: boolean;
    inline?: boolean;
    proxy?: any;
    host?: string;
    quiet?: boolean;
    noInfo?: boolean;
    watchOptions?: any;
  };
  node?: {
    process?: boolean;
    global?: boolean;
    Buffer?: boolean;
    crypto?: boolean;
    module?: boolean;
    clearImmediate?: boolean;
    setImmediate?: boolean;
    clearTimeout?: boolean;
    setTimeout?: boolean;
    __dirname?: boolean;
    __filename?: boolean;
  };
}

export interface DefaultConfig {
  rules: any[];
  plugins: any[];
}

export interface CustomConfig {
  rules: any[];
  plugins: any[];
}

export interface HeadTags {
  link?: any[];
  meta?: any[];
  title?: string;
}

export interface WebpackLoader {
  enforce?: any;
  test?: any;
  use?: any;
  exclude?: any;
}

export interface DefaultLoaders {
  tsLintLoader?: WebpackLoader;
  sourceMapLoader?: WebpackLoader;
  tsLoader?: WebpackLoader;
  vueLoader?: WebpackLoader;
  cssLoader?: WebpackLoader;
  htmlLoader?: WebpackLoader;
  fileLoader?: WebpackLoader;
  fontLoader?: WebpackLoader;
}
