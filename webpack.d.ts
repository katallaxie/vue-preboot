interface WebpackConfig {
  cache?: boolean;
  target?: string;
  devtool?: string | boolean;
  entry: any;
  externals?: any;
  output: any;
  module?: any;
  context?: any;
  plugins?: Array<any>;
  performance?:
  | boolean
  | {
    hints?: string;
    assetFilter?: string;
    maxEntrypointSize?: string;
    maxAssetSize?: string;
  };
  resolve?: {
    extensions?: Array<string>;
    modules?: Array<string>;
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

type DefaultConfig = {
  rules: any[];
  plugins: any[];
};

interface CustomConfig {
  rules: any[];
  plugins: any[];
}

interface HeadTags {
  link?: any[];
  meta?: any[];
  title?: string;
}

interface WebpackLoader {
  enforce?: any;
  test?: any;
  use?: any;
  exclude?: any;
}

interface DefaultLoaders {
  tsLintLoader?: WebpackLoader;
  sourceMapLoader?: WebpackLoader;
  tsLoader?: WebpackLoader;
  vueLoader?: WebpackLoader,
  cssLoader?: WebpackLoader;
  htmlLoader?: WebpackLoader;
  fileLoader?: WebpackLoader;
}
